/**
 * @module views/links/Account
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
	'txt!tpl/links/item.html',
	'txt!tpl/links/dataInput.html'
], function(Backbone, Handlebars, Provider, ListItem, template, inputTemplate) {
	template = Handlebars.compile(template);
	inputTemplate = Handlebars.compile(inputTemplate);

	/**
	 * @class views.links.Account
	 * @extends views.basic.Item
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
			'click a.edit':   'edit',
			'click a.save':   'save',
			'click a.cancel': 'cancel'
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
				id: this.model.get('providerId')
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
				link: this.model.richAttributes(),
				provider: this._provider.richAttributes()
			}));
			var $buttons = this.$el.find('form > div.buttons');
			var data = this._provider.get('auth').data;
			for(var i = 0; i < data.length; i++) {
				$buttons.before(this.renderInput(data[i]));
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
		 * @param e {MouseEvent}
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
		 * @method _authData
		 * @private
		 */
		_authData: function() {
			var $inputs = $('form input');
			var data = this._provider.get('auth').data;
			var result = {};
			for(var i = 0; i < data.length; i++) {
				result[data[i].name] = $inputs.filter('[name=' + data[i].name + ']').val();
			}
			return result;
		}
	});

	return View;
});