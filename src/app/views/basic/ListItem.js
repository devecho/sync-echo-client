/**
 * @module views/basic/ListItem
 * @requires backbone
 */
define([
	'backbone'
], function(Backbone) {

	/**
	 * @class views.basic.ListItem
	 * @extends Backbone.View
	 * @abstract
	 * @constructor
	 */
	var ListItemView = Backbone.View.extend({
		tagName: 'li',
		className: '',

		/**
		 * @method initialize
		 * @param options {Object}
		 * @public
		 */
		initialize: function(options) {
			Backbone.View.prototype.initialize.call(this, options);
			this.listenTo(this.model, 'change', this.render, this);
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			Backbone.View.prototype.render.call(this);
			this.delegateEvents();
			return this;
		}
	});

	/**
	 * Indicates a potential change of the view' dimensions
	 *
	 * @event change
	 */

	return ListItemView;
});