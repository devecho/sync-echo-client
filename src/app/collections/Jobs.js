/**
 * @module collections/Jobs
 * @requires backbone
 * @requires models/Job
 */
define([
	'backbone',
    'models/Job'
], function(Backbone, Job) {

	/**
	 * @namespace collections
	 * @class Jobs
	 * @type {Backbone.Collection}
	 */
	var Collection = Backbone.Collection.extend({
		urlRoot: 'jobs/',

		/**
		 * @property model
		 * @type {Function}
		 * @default models.Job
		 * @protected
		 */
		model: Job
	});

	return Collection;
});