/**
 * @module collections/Links
 * @requires backbone
 * @requires models/Link
 */
define([
	'backbone',
    'models/Link'
], function(Backbone, Link) {

	/**
	 * @class collections.Links
	 * @type {Backbone.Collection}
	 */
	var Collection = Backbone.Collection.extend({
		urlRoot: 'links/',

		/**
		 * @property model
		 * @type {Function}
		 * @default models.Link
		 * @protected
		 */
		model: Link,

		/**
		 * @method byProviderId
		 * @param providerId {string}
		 * @returns {models.Link}
		 */
		byProviderId: function(providerId) {
			var match = null;
			this.each(function(model) {
				if(model.get('providerId') === providerId) {
					match = model;
					return false;
				}
			});
			return match;
		}
	});

	return Collection;
});