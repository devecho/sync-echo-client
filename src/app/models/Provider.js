/**
 * @module models/Provider
 * @requires backbone
 */
define([
	'backbone'
], function(Backbone) {

	/**
	 * @class models.Provider
	 * @type {Backbone.Model}
	 */
	var Model = Backbone.Model.extend({
		urlRoot: 'providers/:id',

		/**
		 * @property defaults
		 * @type {Object}
		 * @protected
		 */
		defaults: {

			/**
			 * @property attributes.type
			 * @type {string}
			 * @default 'provider'
			 * @public
			 * @final
			 */
			type: 'provider',

			/**
			 * @property attributes.name
			 * @type {string}
			 * @default ''
			 * @public
			 */
			name: '',

			/**
			 * @property attributes.url
			 * @type {string}
			 * @default ''
			 * @public
			 */
			url: '',

			/**
			 * @property attributes.version
			 * @type {string}
			 * @default ''
			 * @public
			 */
			version: null,

			/**
			 * @property attributes.auth
			 * @type {Object}
			 * @public
			 */
			auth: {

				/**
				 * @property attributes.auth.type
				 * @type {string}
				 * @default null
				 * @public
				 */
				type: 'authentication',

				/**
				 * @property attributes.auth.mode
				 * @type {string}
				 * @default null
				 * @public
				 */
				mode: null,

				/**
				 * @property attributes.auth.data
				 * @type {{type: 'field', name: {string}, kind: {string}}[]}
				 * @default []
				 * @public
				 */
				data: []
			}
		}
	});

	return Model;
})
;