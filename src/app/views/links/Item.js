/**
 * @module views/links/Item
 * @requires backbone
 * @requires lib/handlebars
 * @requires models/Provider
 * @requires views/basic/ListItem
 */
define([
	'backbone',
	'lib/handlebars',
	'models/Provider',
	'views/basic/ListItem',
	'tpl!links/item',
	'tpl!links/dataInput'
], function(Backbone, Handlebars, Provider, ListItem, template, inputTemplate) {

	/**
	 * @class views.links.Account
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
		 * @property _provider
		 * @type {models.Provider}
		 * @default null
		 * @private
		 */
		_provider: null,

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click a.edit':                   'edit',
			'click a.save':                   'save',
			'click a.cancel':                 'cancel',
			'click a.delete, a.deleteCancel': 'toggleDelete',
			'click a.deleteConfirm':          'delete'
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
			this._provider = new Provider({
				id: this.model.get('provider')
			});
			this._provider.fetch({
				success: function() {
					self.render();
				}
			});
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			ListItem.prototype.render.apply(this, arguments);
			this.$el.html(template({
				link:       this.model.richAttributes(),
				provider:   this._provider.richAttributes(),
				identifier: this.model.identifier()
			}));
			var $buttons = this.$el.find('form > div.buttons');
			var data = this._provider.get('auth').data;
			for(var i = 0; i < data.length; i++) {
				$buttons.before(this.renderInput(_.extend(data[i], {
					value: this.model.value(data[i].name)
				})));
			}
			this.$el.toggleClass('isNew', this.model.isNew());
			if(this.model.isNew()) {
				this.edit();
			}
			return this;
		},

		/**
		 * @method renderInput
		 * @param options {Object}
		 * @protected
		 */
		renderInput: function(options) {
			return inputTemplate(options);
		},

		/**
		 * @method edit
		 * @param [e] {MouseEvent}
		 * @protected
		 */
		edit: function(e) {
			this.$el.addClass('editing');
		},

		/**
		 * @method cancel
		 * @param e {MouseEvent}
		 * @protected
		 */
		cancel: function(e) {
			if(this.model.isNew()) {
				this.model.destroy();
				return;
			}
			this.$el.removeClass('editing');
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
		 * @method toggleDelete
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleDelete: function(e) {
			this.$el.find('.deleteContainer').toggleClass('confirm');
		},

		/**
		 * @method delete
		 * @param e {MouseEvent}
		 * @public
		 */
		delete: function(e) {
			this.model.destroy();
		},

		/**
		 * @method _authData
		 * @return {Array}
		 * @private
		 */
		_authData: function() {
			var $inputs = $('form input');
			var data = this._provider.get('auth').data;
			var result = [];
			for(var i = 0; i < data.length; i++) {
				result.push({
					type:  'field',
					name:  data[i].name,
					value: $inputs.filter('[name=' + data[i].name + ']').val()
				});
			}
			return result;
		}
	});

	return View;
});