/**
 * @module models/Link
 * @requires lib/backbone
 */
define([
	'backbone'
], function(Backbone) {
	"use strict";

	/**
	 * @namespace models
	 * @class Link
	 * @constructor
	 * @extends Backbone.Model
	 */
	var Model = Backbone.Model.extend({

		/**
		 * @property urlRoot
		 * @type {string}
		 * @protected
		 */
		urlRoot: 'links/:id',

		/**
		 * @property attributes.type
		 * @type {string}
		 * @default 'link'
		 * @readonly
		 * @protected
		 */
		/**
		 * @property attributes.providerId
		 * @type {string}
		 * @default ''
		 * @protected
		 */
		/**
		 * @property attributes.data
		 * @type {{field: {string}, value: {string}}[]}
		 * @default []
		 * @protected
		 */

		defaults: {
			type: 'link',
			providerId: '',
			data: []
		}
	});

	return Model;
});