/**
 * @module views/general/Impressum
 * @requires backbone
 * @requires lib/handlebars
 */
define([
	'backbone',
	'lib/handlebars',
	'tpl!general/impressum'
], function(Backbone, Handlebars, template) {

	/**
	 * @class views.general.Impressum
	 * @extends Backbone.View
	 * @constructor
	 */
	var View = Backbone.View.extend({

		/**
		 * @property className
		 * @type {string}
		 * @default 'impressum'
		 * @protected
		 */
		className: 'impressum',

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
		}
	});

	return View;
});