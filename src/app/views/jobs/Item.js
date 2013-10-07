/**
 * @module views/jobs/Item
 * @requires backbone
 * @requires lib/handlebars
 * @requires models/Provider
 * @requires views/basic/ListItem
 * @requires utils
 */
define([
	'backbone',
	'lib/handlebars',
	'models/Job',
	'views/basic/ListItem',
	'utils',
	'tpl!jobs/item'
], function(Backbone, Handlebars, Job, ListItem, utils, template, inputTemplate) {

	/**
	 * @namespace views.jobs
	 * @class Item
	 * @extends views.basic.ListItem
	 * @constructor
	 */
	var View = ListItem.extend({

		/**
		 * @property tagName
		 * @type {string}
		 * @default 'li'
		 * @protected
		 */
		tagName: 'li',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
		},

		/**
		 * @method initialize
		 * @param options {Object}
		 * @chainable
		 * @public
		 */
		initialize: function(options) {
			var self = this;
			ListItem.prototype.initialize.apply(this, arguments);
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			ListItem.prototype.render.apply(this, arguments);
			this.$el.html(template(this.model.richAttributes()));
			return this;
		},

		/**
		 * @method save
		 * @param e {MouseEvent}
		 * @protected
		 */
		save: function(e) {
			var self = this;
			this.model.save({
				data: this._authData()
			}, {
				success: function() {
					self.$el.removeClass('editing');
				}
			});
		},

		/**
		 * @method filter
		 * @param str {string}
		 * @public
		 */
		filter: function(str) {
			this.$el.toggleClass('hidden', !utils.matchFilter(str, [
				this.model.get('name'),
				this.model.get('description')
			]));
		}
	});

	return View;
});