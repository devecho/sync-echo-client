/**
 * @module views/links/ProviderList
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/basic/List
 * @requires views/links/Provider
 */
define([
	'backbone',
	'lib/handlebars',
	'views/links/Provider',
	'views/basic/List',
	'txt!tpl/links/providerList.html'
], function(Backbone, Handlebars, Provider, template) {
	template = Handlebars.compile(template);

	/**
	 * @class views.links.ProviderList
	 * @constructor
	 * @extends Backbone.View
	 */
	var View = Backbone.View.extend({

		/**
		 * @property tagName
		 * @type {string}
		 * @default 'ul'
		 * @protected
		 */
		tagName: 'div',

		/**
		 * @property className
		 * @type {string}
		 * @default 'providerList'
		 * @protected
		 */
		className: 'providers',


		/**
		 * @property _providers
		 * @type {collections.Providers}
		 * @default null
		 * @private
		 */
		_providers: null,

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {

		},

		/**
		 * @property _itemViews
		 * @type {views.selection.Provider[]}
		 * @protected
		 */
		_itemViews: null,

		/**
		 * @method initialize
		 * @param options {Object}
		 *      @param options.collections {collections.Links}
		 *      @param options.providers {collections.Providers}
		 * @public
		 */
		initialize: function(options) {
			this._itemViews = [];
			this._providers = options.providers;

			this.listenTo(this.collection, 'add remove reset sort',
				this.resetItemViews, this);
			this.listenTo(this._providers, 'add remove reset sort',
				this.resetItemViews, this);

			this.resetItemViews();
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			Backbone.View.prototype.render.apply(this, arguments);
			this.$el.html(template());
			var targetList;
			for(var i = 0; i < this._itemViews.length; i++) {
				if(this._itemViews[i].model.isNew()) {
					targetList = $('ul.unlinked', this.el);
				}
				else {
					targetList = $('ul.linked', this.el);
				}
				this._itemViews[i].render().appendTo(targetList);
			}
			return this;
		},

		/**
		 * @method resetItemViews
		 * @chainable
		 * @public
		 */
		resetItemViews: function() {
			var self = this;
			for(var i = 0; i < this._itemViews.length; i++) {
				this._itemViews[i].destroy();
			}
			this._providers.each(function(provider) {
				var view = new Provider({
					model: self.collection.byProviderId(provider.id),
					provider: provider
				});
				self._itemViews.push(view);
			});
			return this.render();
		}
	});

	return View;
});