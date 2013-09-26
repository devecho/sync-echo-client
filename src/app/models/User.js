/**
 * @module models/User
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
		urlRoot: 'users/:id',

		/**
		 * @property attributes.type
		 * @type {string}
		 * @default 'user'
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
		 * @property attributes.email
		 * @type {string}
		 * @default ''
		 * @protected
		 */
		/**
		 * @property attributes.activationDate
		 * @type {string}
		 * @default ''
		 * @readonly
		 * @protected
		 */

		defaults: {
			type: 'user',
			name: '',
			email: '',
			activationDate: ''
		},

		readOnly: {
			activationDate: true
		}
	}, {
		/**
		 * @method current
		 * @returns {models.User}
		 * @public
		 * @static
		 */
		current: function() {
			var current = new Model();
			current.urlRoot = 'users/current';
			return current;
		}
	});

	return Model;
});