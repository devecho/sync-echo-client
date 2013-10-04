/**
 * @module views/jobs/List
 * @requires backbone
 * @requires lib/handlebars
 * @requires views/links/Item
 * @requires views/basic/List
 * @requires models/Job
 * @requires collections/Jobs
 */
define([
	'backbone',
	'lib/handlebars',
	'views/jobs/Item',
	'views/basic/List',
	'models/Job',
	'collections/Jobs',
	'tpl!jobs/list',
	'tpl!jobs/item'
], function(Backbone, Handlebars, ItemView, ListView, JobModel, Jobs, template, providerTempalte) {

	/**
	 * @class views.links.List
	 * @constructor
	 * @extends views.basic.List
	 */
	var View = ListView.extend({

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
		 * @default 'jobList'
		 * @protected
		 */
		className: 'jobList',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
		},

		/**
		 * @method renderTemplate
		 * @chainable
		 * @public
		 */
		renderTemplate: function() {
			this.$el.html(template());
		}
	}, {

		/**
		 * @property ulSelector
		 * @type {string}
		 * @default '> ul'
		 * @protected
		 * @static
		 */
		ulSelector: '> ul',

		/**
		 * @property ItemView
		 * @type {Function}
		 * @protected
		 * @static
		 */
		ItemView: ItemView
	});

	return View;
});