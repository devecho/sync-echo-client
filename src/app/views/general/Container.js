/**
 * @module views/general/Container
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/links/List
 * @requires collections/Links
 */
define([
	'backbone',
	'lib/handlebars',
	'views/links/List',
	'collections/Links',
	'txt!tpl/general/container.html'
], function(Backbone, Handlebars, LinkList, Links, template) {
	template = Handlebars.compile(template);

	/**
	 * @class views.general.Container
	 * @extends Backbone.View
	 * @constructor
	 */
	var View = Backbone.View.extend({

		/**
		 * @property tagName
		 * @type {string}
		 * @default 'nav'
		 * @protected
		 */
		tagName: 'div',

		/**
		 * @property id
		 * @type {string}
		 * @default 'nav'
		 * @protected
		 */
		id: 'main',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {

		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			this.$el.html(template({}));
			return this;
		},

		/**
		 * @method links
		 * @public
		 */
		links: function() {
			this.$el.find('a.links').addClass('active');
			var self = this;
			new Links().fetch({
				success: function(links) {
					var linkList = new LinkList({
						collection: links
					});
					self.subView('.main', linkList.render(), true);
				}
			});
		}
	});

	return View;
});