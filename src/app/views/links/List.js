/**
 * @module views/links/List
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/links/Item
 * @requires views/basic/List
 * @requires models/Link
 * @requires collections/Providers
 */
define([
	'backbone',
	'lib/handlebars',
	'views/links/Item',
	'views/basic/List',
	'models/Link',
	'collections/Providers',
	'txt!tpl/links/list.html',
	'txt!tpl/links/provider.html'
], function(Backbone, Handlebars, LinkView, ListView, LinkModel, Providers, template, providerTempalte) {
	template = Handlebars.compile(template);
	providerTempalte = Handlebars.compile(providerTempalte);

	/**
	 * @class views.links.List
	 * @constructor
	 * @extends views.basic.List
	 */
	var View = ListView.extend({

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
		className: 'links',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click .new':            'toggleProvider',
			'click ul.providers li': 'add'
		},

		/**
		 * @method renderTemplate
		 * @chainable
		 * @public
		 */
		renderTemplate: function() {
			var self = this;
			this.$el.html(template());
			var $providerList = this.$el.find('ul.providers');
			new Providers().fetch({
				success: function(providers) {
					providers.each(function(provider) {
						$providerList.append(
							providerTempalte(provider.richAttributes())
						);
					});
				}
			});
		},

		/**
		 * @method toggleProvider
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleProvider: function(e) {
			this.$el.toggleClass('showProviders');
		},

		/**
		 * @method add
		 * @param e {MouseEvent}
		 * @public
		 */
		add: function(e) {
			this.collection.add(new LinkModel({
				providerId: $(e.currentTarget).data('providerId')
			}));
		}
	}, {

		/**
		 * @property ulSelector
		 * @type {string}
		 * @default '> ul'
		 * @protected
		 * @static
		 */
		ulSelector: '> ul',

		/**
		 * @property ItemView
		 * @type {Function}
		 * @protected
		 * @static
		 */
		ItemView: LinkView
	});

	return View;
});