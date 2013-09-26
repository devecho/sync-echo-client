/**
 * @module routers/Main
 * @requires backbone
 * @requires views/general/Container
 */
define([
	'backbone',
    'views/general/Container'
], function(Backbone, ContainerView) {

	/**
	 * @namespace routers
	 * @class Main
	 * @constructor
	 * @extends Backbone.Router
	 */
	var MainRouter = Backbone.Router.extend({

		/**
		 * @property _container
		 * @type {views.general.Container}
		 * @default null
		 * @private
		 */
		_container: null,

		/**
		 * @property routes
		 * @type {Object}
		 * @public
		 */
		routes: {
			'': 'routeDefault',
			'links': 'links'
		},

		/**
		 * @method initialize
		 * @chainable
		 * @public
		 */
		initialize: function() {
			this._container = new ContainerView().render();
			this._container.appendTo('body');
			return this;
		},

		/**
		 * @method routeDefault
		 * @chainable
		 * @public
		 */
		routeDefault: function() {
			this.links();
			return this;
		},

		/**
		 * @method links
		 * @chainable
		 * @public
		 */
		links: function() {
			var self = this;
			this.before(function() {
				this._container.links();
			});
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
