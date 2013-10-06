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
	'tpl!links/list',
	'tpl!links/provider'
], function(Backbone, Handlebars, LinkView, ListView, LinkModel, Providers, template,
            providerTempalte) {

	/**
	 * @namespace views.links
	 * @class List
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
		 * @method add
		 * @param e {MouseEvent}
		 * @public
		 */
		add: function(e) {
			this.collection.add(new LinkModel({
				provider: {
					type: 'provider',
					id:   $(e.currentTarget).data('providerId'),
					data: []
				}
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