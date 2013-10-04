/**
 * @module models/Job
 * @requires lib/backbone
 * @requires models/Link
 */
define([
	'backbone',
	'models/Link'
], function(Backbone, Link) {
	"use strict";

	/**
	 * @namespace models
	 * @class User
	 * @constructor
	 * @extends Backbone.Model
	 */
	var Model = Backbone.Model.extend({

		/**
		 * @property urlRoot
		 * @type {string}
		 * @protected
		 */
		urlRoot:  'jobs/:id',

		/**
		 * @property attributes.type
		 * @type {string}
		 * @default 'job'
		 * @readonly
		 * @protected
		 */
		/**
		 * @property attributes.name
		 * @type {string}
		 * @default ''
		 * @protected
		 */
		/**
		 * @property attributes.description
		 * @type {string}
		 * @default ''
		 * @protected
		 */
		/**
		 * @property attributes.enabled
		 * @type {boolean}
		 * @default true
		 * @protected
		 */
		/**
		 * @property attributes.source.type
		 * @type {string}
		 * @default 'sources'
		 * @protected
		 * @final
		 */
		/**
		 * @property attributes.source.link
		 * @type {string}
		 * @default null
		 * @protected
		 */
		/**
		 * @property attributes.target.type
		 * @type {string}
		 * @default 'target'
		 * @protected
		 * @final
		 */
		/**
		 * @property attributes.target.link
		 * @type {string}
		 * @default null
		 * @protected
		 */

		defaults: {
			type:        'job',
			name:        '',
			description: '',
			enabled:     true,
			source:      {
				type: 'source',
				link: null
			},
			target:      {
				type: 'target',
				link: null
			},
			data:        []
		},

		/**
		 * @method sourceLink
		 * @return {models.Link}
		 * @public
		 */
		sourceLink: function() {
			return new Link({
				id: this.get('source').link
			});
		},

		/**
		 * @method targetLink
		 * @return {models.Link}
		 * @public
		 */
		targetLink: function() {
			return new Link({
				id: this.get('target').link
			});
		}
	});

	return Model;
});