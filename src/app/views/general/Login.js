/**
 * @module views/general/Login
 * @requires backbone
 * @requires lib/handlebars
 * @requires utils
 */
define([
	'backbone',
	'lib/handlebars',
	'utils',
	'tpl!general/login'
], function(Backbone, Handlebars, utils, template) {

	/**
	 * @class views.general.Login
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
		className: 'login',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click a.submit': 'login'
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			this.$el.html(template({
				//username: utils.cookie('username') || ''
			}));
			return this;
		},

		/**
		 * @method login
		 * @param e {MouseEvent}
		 * @public
		 */
		login: function(e) {
			this.trigger('login');
			this.destroy();
		}
	});

	return View;
});