/**
 * @module views/general/Error
 * @requires backbone
 * @requires lib/handlebars
 */
define([
	'backbone',
	'lib/handlebars',
	'localization',
	'tpl!general/error'
], function(Backbone, Handlebars, local, template) {

	/**
	 * @class views.general.Error
	 * @extends Backbone.View
	 * @constructor
	 */
	var View = Backbone.View.extend({

		/**
		 * @property className
		 * @type {string}
		 * @default 'nav'
		 * @protected
		 */
		className: 'error',

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
			this.$el.html(template({
				message: local('general.error')
			}));
			return this;
		}
	});

	return View;
});