/**
 * @module views/jobs/Details
 * @requires backbone
 * @requires lib/handlebars
 * @requires models/Job
 * @requires collections/Links
 */
define([
	'backbone',
	'lib/handlebars',
	'app',
	'models/Job',
	'tpl!jobs/details'
], function(Backbone, Handlebars, app, Job, template) {
	'use strict';

	/**
	 * @namespace views.jobs
	 * @class Details
	 * @constructor
	 * @extends Backbone.View
	 */
	var View = Backbone.View.extend({

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
		 * @default 'editJob'
		 * @protected
		 */
		className: 'jobDetails',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click a.delete, a.deleteCancel': 'toggleDelete',
			'click a.deleteConfirm':          'deleteJob'
		},

		/**
		 * @property _source
		 * @type {models.Link}
		 * @default null
		 * @private
		 */
		_source: null,

		/**
		 * @property _target
		 * @type {models.Link}
		 * @default null
		 * @private
		 */
		_target: null,

		/**
		 * @method initialize
		 * @param options {Object}
		 * @chainable
		 * @public
		 */
		initialize: function(options) {
			Backbone.View.prototype.initialize.apply(this, arguments);

			var self = this;
			this._source = this.model.sourceLink();
			this._source.fetch({
				success: function() {
					self.render();
				}
			});

			this._target = this.model.targetLink();
			this._target.fetch({
				success: function() {
					self.render();
				}
			});
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			this.$el.html(template({
				job:    this.model.richAttributes(),
				source: _.extend(this._source.richAttributes(), {
				}),

				target: _.extend(this._target.richAttributes(), {
				})
			}));
			return this;
		},

		/**
		 * @method toggleDelete
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleDelete: function(e) {
			this.$el.find('.deleteContainer').toggleClass('confirm');
		},

		/**
		 * @method deleteJob
		 * @param e {MouseEvent}
		 * @public
		 */
		deleteJob: function(e) {
			this.model.destroy({
				success: function() {
					app.router.navigate('jobs', true);
				}
			});
		}
	});

	return View;
});