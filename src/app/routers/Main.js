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
			'':          'routeDefault',
			'links':     'links',
			'jobs':      'jobs',
			'jobs/edit': 'editJob',
			'jobs/:id':  'job'
		},

		/**
		 * @method initialize
		 * @public
		 */
		initialize: function() {
			this._container = new ContainerView().render();
			this._container.appendTo('body');
		},

		/**
		 * @method routeDefault
		 * @public
		 */
		routeDefault: function() {
			this.links();
			return this;
		},

		/**
		 * @method links
		 * @public
		 */
		links: function() {
			this.before(function() {
				this._container.links();
			});
		},

		/**
		 * @method jobs
		 * @public
		 */
		jobs: function() {
			this.before(function() {
				this._container.jobs();
			});
		},

		/**
		 * @method editJob
		 * @public
		 */
		editJob: function() {
			this.before(function() {
				this._container.editJob();
			});
		},

		/**
		 * @method job
		 * @param id {string}
		 * @public
		 */
		job: function(id) {
			this.before(function() {
				this._container.job(id);
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
