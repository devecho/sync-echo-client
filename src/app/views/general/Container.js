/**
 * @module views/general/Container
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/links/List
 * @requires collections/Links
 * @requires views/jobs/Edit
 * @requires views/jobs/Details
 * @requires views/general/Impressum
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
	'views/general/Impressum',
	'tpl!general/container'
], function(Backbone, Handlebars, Links, Jobs, Job, LinkList, JobList, EditJobView,
            JobDetailsView, ImpressumView, template) {

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
		 * @param [viewId] {string}
		 * @public
		 */
		links: function(viewId) {
			this._activateLink('links');
			var self = this;
			new Links().fetch({
				success: function(links) {
					var linkList = new LinkList({
						collection: links
					}).render();
					if(viewId) {
						linkList.scrollTo(viewId);
					}
					self.subView('.main', linkList, true);
				}
			});
		},

		/**
		 * @method link
		 * @param viewId {string}
		 * @public
		 */
		link: function(viewId) {
			this.links(viewId);
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
		 * @param id {string}
		 * @public
		 */
		editJob: function(id) {
			var self = this;
			var show = function(job) {
				self._activateLink('jobs');
				self.subView('.main', new EditJobView({
					model: job
				}).render(), true);
			}

			if(!id) {
				show(new Job());
			}
			else {
				new Job({
					id: id
				}).fetch({
						success: function(job) {
							show(job);
						}
					});
			}
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
		 * @method impressum
		 * @public
		 */
		impressum: function() {
			this.subView('.main', new ImpressumView({
			}).render(), true);
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