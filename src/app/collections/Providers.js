/**
 * @module collections/Providers
 * @requires backbone
 * @requires models/Provider
 */
define([
	'backbone',
    'models/Provider'
], function(Backbone, Provider) {

	/**
	 * @class collections.Providers
	 * @type {Backbone.Collection}
	 */
	var Collection = Backbone.Collection.extend({
		urlRoot: 'providers',

		/**
		 * @property model
		 * @type {Function}
		 * @default models.Provider
		 * @protected
		 */
		model: Provider
	});

	return Collection;
});