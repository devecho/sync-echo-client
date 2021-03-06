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
		urlRoot:    'links/:id',

		/**
		 * @property attributes.type
		 * @type {string}
		 * @default 'link'
		 * @readonly
		 * @protected
		 */
		/**
		 * @property attributes.provider
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		/**
		 * @property attributes.provider.id
		 * @type {number}
		 * @protected
		 */
		/**
		 * @property attributes.provider.type
		 * @type {string}
		 * @protected
		 */
		/**
		 * @property attributes.provider.name
		 * @type {string}
		 * @protected
		 */
		/**
		 * @property attributes.data
		 * @type {{name: {string}, value: {string}}[]}
		 * @default []
		 * @protected
		 */

		defaults:   {
			type:     'link',
			provider: null,
			data:     []
		},

		/**
		 * @method value
		 * @param name {string}
		 * @return {string}
		 * @public
		 */
		value: function(name) {
			var data = this.get('data');
			for(var i = 0; i < data.length; i++) {
				if(data[i].name === name) {
					return data[i].value;
				}
			}
			return null;
		},

		/**
		 * @method identifier
		 * @return {string}
		 * @public
		 */
		identifier: function(field) {
			return this.value('username') || '';
		},

		/**
		 * @method richAttributes
		 * @return {string}
		 * @public
		 */
		richAttributes: function(field) {
			var attrs = Backbone.Model.prototype.richAttributes.apply(this, arguments);
			return _.extend(attrs, {
				identifier:   this.identifier(),
				providerName: this.get('providerName')
			});
		}
	});

	return Model;
});