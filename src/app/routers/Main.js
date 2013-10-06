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
			'':              'routeDefault',
			'links':         'links',
			'links/:id':     'link',
			'jobs':          'jobs',
			'jobs/create':   'editJob',
			'jobs/:id':      'job',
			'jobs/:id/edit': 'editJob',
			'impressum':     'impressum'
		},

		/**
		 * @method initialize
		 * @param options {Object}
		 * @public
		 */
		initialize: function(options) {
			this._container = new ContainerView().render();
			this._container.appendTo('body');
		},

		/**
		 * @method routeDefault
		 * @public
		 */
		routeDefault: function() {
			this.navigate('jobs', true);
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
		 * @method link
		 * @param id {string}
		 * @public
		 */
		link: function(id) {
			this.before(function() {
				this._container.link(parseInt(id));
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
		 * @param id {string}
		 * @public
		 */
		editJob: function(id) {
			this.before(function() {
				this._container.editJob(id);
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
		 * @method impressum
		 * @public
		 */
		impressum: function() {
			this.before(function() {
				this._container.impressum();
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
