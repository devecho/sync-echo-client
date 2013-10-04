/**
 * @module views/general/Container
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/links/List
 * @requires collections/Links
 * @requires views/jobs/Edit
 */
define([
	'backbone',
	'lib/handlebars',
	'collections/Links',
	'collections/Jobs',
	'models/Job',
	'views/links/List',
	'views/jobs/List',
	'views/jobs/Edit',
	'views/jobs/Details',
	'tpl!general/container'
], function(Backbone, Handlebars, Links, Jobs, Job, LinkList, JobList, EditJobView,
            JobDetailsView, template) {

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
			this._activateLink('links');
			var self = this;
			new Links().fetch({
				success: function(links) {
					var linkList = new LinkList({
						collection: links
					});
					self.subView('.main', linkList.render(), true);
				}
			});
		},

		/**
		 * @method jobs
		 * @public
		 */
		jobs: function() {
			this._activateLink('jobs');
			var self = this;
			new Jobs().fetch({
				success: function(jobs) {
					var jobList = new JobList({
						collection: jobs
					});
					self.subView('.main', jobList.render(), true);
				}
			});
		},

		/**
		 * @method editJob
		 * @public
		 */
		editJob: function() {
			this._activateLink('jobs');
			this.subView('.main', new EditJobView().render(), true);
		},

		/**
		 * @method job
		 * @param id {string}
		 * @public
		 */
		job: function(id) {
			var self = this;
			this._activateLink('jobs');
			new Job({
				id: id
			}).fetch({
					success: function(job) {
						self.subView('.main', new JobDetailsView({
							model: job
						}).render(), true);
					}
				});
		},

		/**
		 * @method _activateLink
		 * @param className {string}
		 * @private
		 */
		_activateLink: function(className) {
			this.$el.find('a').removeClass('active')
				.filter('.' + className).addClass('active');
		}
	});

	return View;
});