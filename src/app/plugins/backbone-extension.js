define([
	'config',
	'lib/backbone',
	'lib/underscore',
	'core/Path',
	'core/URLPattern'
], function(config, Backbone, _, Path, URLPattern) {


	_.extend(Backbone.Router.prototype, new function() {

		/**
		 * @property currentViews
		 * @type {Object}
		 * @default {}
		 * @private
		 * @final
		 */
		var currentViews = {};

		return {

			/**
			 * @method view
			 * @param selector {string}
			 * @param view {Backbone.View}
			 * @chainable
			 */
			view: function(selector, view) {
				if(currentViews[selector]) {
					currentViews[selector].destroy();
				}
				currentViews[selector] = view;
				view.appendTo(selector);
				return this;
			}
		};
	});

	_.extend(Backbone.View.prototype, Backbone.Events, new function() {
		return {

			/**
			 * @for Backbone.View
			 * @property parentView
			 * @type {Backbone.View}
			 * @default null
			 * @protected
			 */
			parentView: null,

			/**
			 * @for Backbone.View
			 * @property subViews
			 * @type {Object}
			 * @default null
			 * @protected
			 */
			subViews: null,

			/**
			 * @for Backbone.View
			 * @property _renderedOnce
			 * @type {boolean}
			 * @private
			 */
			_renderedOnce: false,

			/**
			 * @for Backbone.View
			 * @method initialize
			 * @param options {Object}
			 * @protected
			 */
			initialize: function(options) {
				if(this.parentView !== null) {
					this.listenTo('append', this.parentView, function() {
						this.trigger('append');
					}, this);
				}
			},

			/**
			 * @for Backbone.View
			 * @method subView
			 * @param selector {string}
			 * @param view {Backbone.View}
			 * @param [replace=false] {boolean}
			 * @chainable
			 * @public
			 */
			subView: function(selector, view, replace) {
				if(this.subViews === null) {
					this.subViews = {};
				}
				if(typeof view === 'undefined') {
					return this.subViews[selector] || [];
				}

				if(!this.subViews[selector]) {
					this.subViews[selector] = [];
				}
				if(replace) {
					this.destroySubViewSet(selector);
				}
				this.subViews[selector].push(view);
				view.parentView = this;

				if(this.renderedOnce()) {
					view.render();
				}
				if(this.appended()) {
					view.appendTo(this.$el.find(selector));
				}

				this.listenTo(view, 'destroy', function() {
					this.removeSubView(view);
				}, this);

				return this;
			},

			/**
			 * @for Backbone.View
			 * @method destroySubViewSet
			 * @param selector {string}
			 * @chainable
			 * @public
			 */
			destroySubViewSet: function(selector) {
				while(this.subViews[selector].length > 0) {
					this.subViews[selector][0].destroy();
				}
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method destroySubViews
			 * @chainable
			 * @public
			 */
			destroySubViews: function() {
				for(var selector in this.subViews) {
					this.destroySubViewSet(selector);
				}
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method destroy
			 * @chainable
			 * @public
			 */
			destroy: function() {
				this.trigger('destroy');
				this.destroySubViews();
				this.stopListening();
				this.unbind();
				this.remove();
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method removeSubView
			 * @param view {Backbone.View}
			 * @chainable
			 * @public
			 */
			removeSubView: function(view) {
				var self = this;
				this.eachSubView(function(curView, selector, index) {
					if(curView === view) {
						self.subViews[selector].splice(index, 1);
						return false;
					}
				});
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method eachSubView
			 * @param callback {Function}
			 *      @param callback.view {Backbone.View}
			 *      @param callback.selector {string}
			 *      @param callback.index {number}
			 * @chainable
			 * @public
			 */
			eachSubView: function(callback) {
				outer: for(var selector in this.subViews) {
					for(var i = 0; i < this.subViews[selector].length; i++) {
						if(callback(this.subViews[selector][i], selector, i) === false) {
							break outer;
						}
					}
				}
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method render
			 * @chainable
			 * @public
			 */
			render: function() {
				this.delegateEvents();
				this.renderSubViews();
				this._renderedOnce = true;
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method renderedOnce
			 * @return {boolean}
			 * @public
			 */
			renderedOnce: function() {
				return this._renderedOnce;
			},

			/**
			 * @for Backbone.View
			 * @method renderSubViews
			 * @chainable
			 * @public
			 */
			renderSubViews: function() {
				for(var selector in this.subViews) {
					for(var i = 0; i < this.subViews[selector].length; i++) {
						this.subViews[selector][i].render().appendTo(
							this.$el.find(selector));
					}
				}
				return this;
			},

			/**
			 * @for Backbone.View
			 * @method appended
			 * @return {boolean}
			 * @public
			 */
			appended: function() {
				return this.$el.closest('body').length > 0;
			},

			/**
			 * @for Backbone.View
			 * @method appendTo
			 * @param target {jQuery, HTMLElement, HTMLElement[], string}
			 * @chainable
			 * @public
			 */
			appendTo: function(target) {
				$(target).append(this.el);
				if(this.appended()) {
					this.trigger('append');
				}
				return this;
			}
		};
	});

	var syncWrapper = function(originalSync) {
		return function(method, model, options) {

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

	_.extend(Backbone.Model, {

		/**
		 * @for Backbone.Model
		 * @method latchCallbacks
		 * @param original {{success: {Function}, error: {Function}, always: {Function}}}
		 * @param latched {{success: {Function}, error: {Function}, always: {Function}}}
		 * @returns {{success: {Function}, error: {Function}, always: {Function}}}
		 * @public
		 */
		latchCallbacks: function(original, latched) {
			var methods = ['success', 'error', 'always'];
			var stored = {};
			_.each(methods, function(m) {
				stored[m] = original[m] || function() {
				};
				original[m] = latched[m];
			});
			return stored;
		}
	});

	_.extend(Backbone.Model, {

		/**
		 * @for Backbone.Collection
		 * @method latchCallbacks
		 * @param original {{success: {Function}, error: {Function}, always: {Function}}}
		 * @param latched {{success: {Function}, error: {Function}, always: {Function}}}
		 * @returns {{success: {Function}, error: {Function}, always: {Function}}}
		 * @public
		 */
		latchCallbacks: Backbone.Model.latchCallbacks
	});

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
			 * @property urlPattern
			 * @type {URLPattern}
			 * @protected
			 * @final
			 */
			urlPattern: null,

			/**
			 * @for Backbone.Collection
			 * @property urlParams
			 * @type {Object}
			 * @protected
			 */
			urlParams: null,

			_prepareModel: function(attrs, options) {
				if(attrs instanceof Backbone.Model) {
					if(!attrs.collection) {
						attrs.collection = this;
					}
					return attrs;
				}
				options = options || {};
				options.collection = this;

				// Generate the URL params to be passed to the model (models inherit their collection's URL params)
				var modelParams = _.extend({}, this.urlParams, options.params);

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
				options = options || {};
				this.urlPattern = new URLPattern(this.urlRoot);
				this.urlParams =
				_.extend(options.params || {}, this.collection ? this.collection.urlParams : {});
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
				var path = new Path(
					config('service'),
					this.urlPattern.generate(_.extend(this.urlParams, {id: this.id})));
				return path.toString();
			},

			/**
			 * @for Backbone.Collection
			 * @method comparator
			 * @param a {Backbone.Model}
			 * @param b {Backbone.Model}
			 * @returns {number}
			 * @public
			 */
			comparator: function(a, b) {
				return 0;
			},

			/**
			 * @for Backbone.Collection
			 * @method richAttributes
			 * @returns {Object}
			 * @public
			 */
			richAttributes: function(options) {
				return this.map(function(model) {
					return model.richAttributes(options);
				});
			}
		}
	});

	_.extend(Backbone.Model.prototype, new function() {

		return {

			/**
			 * @property readOnly
			 * @type {Object}
			 * @protected
			 */
			readOnly: {},

			/**
			 * @for Backbone.Model
			 * @method initialize
			 * @param attributes {Object}
			 * @param options {Object}
			 */
			initialize: function(attributes, options) {
				options = options || {};
				this.urlPattern = new URLPattern(this.urlRoot);
				this.urlParams =
				_.extend(options.params || {}, this.collection ? this.collection.urlParams : {});
			},

			/**
			 * @for Backbone.Model
			 * @method toJSON
			 * @param options {Object}
			 * @returns {Object}
			 * @public
			 */
			toJSON: function(options) {
				if(typeof options === 'undefined') {
					return _.clone(this.attributes);
				}
				return this.writableAttributes();
			},

			/**
			 * @for Backbone.Model
			 * @method writableAttributes
			 * @returns {Object}
			 * @public
			 */
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
			 * @method richAttributes
			 * @returns {Object}
			 * @public
			 */
			richAttributes: function() {
				return _.extend(this.toJSON(), {
					isNew: this.isNew()
				});
			},

			/**
			 * @for Backbone.Model
			 * @property urlPattern
			 * @type {URLPattern}
			 * @protected
			 * @final
			 */
			urlPattern: null,

			/**
			 * @for Backbone.Model
			 * @property urlParams
			 * @type {Object}
			 * @protected
			 */
			urlParams: null,

			/**
			 * @for Backbone.Model
			 * @method url
			 * @return {String}
			 */
			url: function() {
				var path = new Path(
					config('service'),
					this.urlPattern.generate(_.extend(this.urlParams, {id: this.id})));
				return path.toString();
			}
		}
	});

	return Backbone;
});
