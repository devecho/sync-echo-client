define([
	'lib/backbone',
	'lib/underscore',
	'core/Path',
	'core/URLPattern'
], function(Backbone, _, Path, URLPattern) {
	
	_.extend(Backbone.View.prototype, Backbone.Events, new function() {
		return {
			_parentView: null,
			_subViews: null,
			
			subView: function(selector, view, replace) {
				if(this._subViews === null) {
					this._subViews = {};
				}
				if(typeof view === 'undefined') {
					return this._subViews[selector] || [];
				}

				if(!this._subViews[selector]) {
					this._subViews[selector] = [];
				}
				if(replace) {
					this.closeSubViewSet(selector);
				}
				this._subViews[selector].push(view);
				view._parentView = this;
				if(this.appended()) {
					view.appendTo(this.$el.find(selector));
				}
				return this;
			},
			
			closeSubViewSet: function(selector) {
				while(this._subViews[selector].length > 0) {
					this._subViews[selector][0].close();
					delete this._subViews[selector].shift()._parentView;
				}
				return this;
			},
			
			closeSubViews: function() {
				for(var selector in this._subViews) {
					this.closeSubViewSet(selector);
				}
				return this;
			},
			
			close: function() {
				this.closeSubViews();
				this.stopListening();
				this.unbind();
				return this;
			},
			
			render: function() {
				this.renderSubViews();
				return this;
			},
			
			renderSubViews: function() {
				for(var selector in this._subViews) {
					for(var i = 0; i < this._subViews[selector].length; i++) {
						this.$el.find(selector).append(this._subViews[selector][i].render().el);
					}
				}
			},

			appended: function() {
				return this.$el.closest('body').length > 0;
			},

			afterAppend: function() {

			},
			
			appendTo: function(target) {
				$(target).append(this.el);
				this._notifyAppended();
			},
			
			_notifyAppended: function() {
				this.afterAppend();
				for(var selector in this._subViews) {
					for(var i = 0; i < this._subViews[selector].length; i++) {
						this._subViews[selector][i]._notifyAppended();
					}
				}
			}
		};
	});
	
	_.extend(Backbone.View, new function() {
		return {
		};
	});

	Backbone.ajax = function(options) {
		return options.together.request().perform(options);
	}

	var syncWrapper = function(originalSync) {
		return function(method, model, options) {
			options.together = this.togetherInstance();

			var success = options.success || function() {
			};

			var error = options.error || function() {
			};

			var deferred = originalSync.call(this, method, model, _.extend(options, {
				success: function(response, status, xhr) {
					options.xhr = xhr;
					var ret = success.apply(this, arguments);
					options.always && options.always();
					return ret;
				},
				error:   function() {
					var ret = error.apply(this, arguments);
					options.always && options.always();
					return ret;
				}
			}));
			return deferred;
		}
	};

	_.extend(Backbone, {currentViews: []});

	_.extend(Backbone.Collection.prototype, new function() {

		return {
			/**
			 * @for Backbone.Collection
			 * @property urlRoot
			 * @type {string}
			 * @protected
			 * @final
			 */
			urlRoot: '',

			/**
			 * @for Backbone.Collection
			 * @property _urlPattern
			 * @type {URLPattern}
			 * @protected
			 * @final
			 */
			_urlPattern: null,

			/**
			 * @for Backbone.Collection
			 * @property _urlParams
			 * @type {Object}
			 * @protected
			 */
			_urlParams: null,

			_prepareModel: function(attrs, options) {
				if(attrs instanceof Backbone.Model) {
					if(!attrs.collection) {
						attrs.collection = this;
					}
					return attrs;
				}
				options ||
				(
					options = {});
				options.collection = this;

				// Generate the URL params to be passed to the model (models inherit their collection's URL params)
				var modelParams = _.extend({}, this._urlParams, options.params);

				/*
				 * If just one model is specified for this collection simply instanciate it
				 * If an object is specified map type attribute to model constructor
				 */
				if(typeof this.model === 'object') {
					var model = new (
						this.model[attrs.type])(attrs, _.extend(options, {
							params: modelParams
						}));
				}
				else {
					var model = new this.model(attrs, options);
				}

				if(!model._validate(attrs, options)) {
					this.trigger('invalid', this, attrs, options);
					return false;
				}
				return model;
			},

			/**
			 * @for Backbone.Collection
			 * @method initialize
			 * @param attributes {Object}
			 * @param options {Object}
			 * @protected
			 */
			initialize: function(attributes, options) {
				this._urlPattern = new URLPattern(this.urlRoot);
				this._urlParams =
				_.extend(options.params || {}, this.collection ? this.collection._urlParams : {});
				for(var i in this.defaults) {
					if((
						   typeof this.defaults[i] === 'object') &&
					   (
						   attributes[i] === this.defaults[i])) {
						attributes[i] = _.clone(this.defaults[i]);
					}
				}
			},

			/**
			 * @for Backbone.Collection
			 * @method url
			 * @return {String}
			 * @public
			 */
			url: function() {
				var path = new Path(this.togetherInstance().servicePath(),
					this._urlPattern.generate(_.extend(this._urlParams, {id: this.id})));
				return path.toString();
			},

			/**
			 * @method eTag
			 * @param callback {Function}
			 * @public
			 * @chainable
			 */
			eTag: function(callback) {
				var this_ = this;
				this.togetherInstance().request().perform({
					type:     'HEAD',
					url: _.isFunction(this.url) ? this.url() : this.url,
					queue:    'background',
					dataType: 'text'
				})
					.done(function(data, status, xhr) {
						this_._lastETag = xhr.getResponseHeader('ETag');
						callback(xhr.getResponseHeader('ETag'));
					})
					.fail(function() {
						callback(null);
					});
				return this;
			}
		}
	});

	_.extend(Backbone.Events,
		(function() {
			var originalOn = Backbone.Events.on;
			var newOn = function(name, callback, context) {
				originalOn.apply(this, arguments);
				var this_ = this;
				return function() {
					this_.off(name, callback, context);
				};
			}

			return {
				on:   newOn,
				bind: newOn
			}
		})());

	// Extend Model/Collection prototype with changed Backbone.Events properties
	_.extend(Backbone.Model.prototype, Backbone.Events);
	_.extend(Backbone.Collection.prototype, Backbone.Events);


	_.extend(Backbone.Model.prototype, new function() {

		return {

			toJSON: function(options) {
				if(typeof options === 'undefined') {
					return _.clone(this.attributes);
				}
				return this.writableAttributes();
			},

			writableAttributes: function() {
				var attrs = _.clone(this.attributes);
				for(var i in attrs) {
					if(this.readOnly[i]) {
						delete attrs[i];
					}
				}
				return attrs;
			},

			/**
			 * @for Backbone.Model
			 * @property _urlPattern
			 * @type {URLPattern}
			 * @protected
			 * @final
			 */
			_urlPattern: null,

			/**
			 * @for Backbone.Model
			 * @property _urlParams
			 * @type {Object}
			 * @protected
			 */
			_urlParams: null,

			/**
			 * @for Backbone.Model
			 * @method initialize
			 * @param attributes {Object}
			 * @param options {Object}
			 */
			initialize: function(attributes, options) {
				this._urlPattern = new URLPattern(this.urlRoot);
				this._urlParams =
				_.extend(options.params || {}, this.collection ? this.collection._urlParams : {});
			},

			/**
			 * @for Backbone.Model
			 * @method url
			 * @return {String}
			 */
			url: function() {
				var path = new Path(this.togetherInstance().servicePath(),
					this._urlPattern.generate(_.extend(this._urlParams, {id: this.id})));
				return path.toString();
			}
		}
	});
	
	return Backbone;
});
