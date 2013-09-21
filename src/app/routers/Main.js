/**
 * @module routers/Main
 * @requires backbone
 * @requires views/main/Site
 */
define(['backbone', 'views/main/Site'], function(Backbone, SiteView) {

	/**
	 * @namespace routers
	 * @class Main
	 * @constructor
	 * @extends Backbone.Router
	 */
	var MainRouter = Backbone.Router.extend({

		/**
		 * @property routes
		 * @type {Object}
		 * @public
		 */
		routes: {
			'': 'routeDefault'
		},

		/**
		 * @method initialize
		 * @chainable
		 * @public
		 */
		initialize: function() {
			this._siteView = new SiteView();
			this._siteView.render().appendTo('body');
			return this;
		},

		/**
		 * @method routeDefault
		 * @chainable
		 * @public
		 */
		routeDefault: function() {
			this.navigate('');
			return this;
		},

		/**
		 * @method before
		 * @chainable
		 * @public
		 */
		before: function(callback) {
			callback.call(this);
		}
	});

	return MainRouter;
});
