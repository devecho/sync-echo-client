/**
 * @module models/Job
 * @requires lib/backbone
 */
define([
	'backbone'
], function(Backbone) {
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
		urlRoot: 'jobs/:id',

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

		defaults: {
			type: 'job',
			name: '',
			description: ''
		}
	});

	return Model;
});