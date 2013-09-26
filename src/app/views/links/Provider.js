/**
 * @module views/links/Account
 * @requires backbone
 * @requires lib/handlebars
 */
define([
	'backbone',
	'lib/handlebars',
	'txt!tpl/links/provider.html',
	'txt!tpl/links/dataInput.html'
], function(Backbone, Handlebars, template, inputTemplate) {
	template = Handlebars.compile(template);
	inputTemplate = Handlebars.compile(inputTemplate);

	/**
	 * @class views.links.Account
	 * @extends Backbone.View
	 * @constructor
	 */
	var View = Backbone.View.extend({

		/**
		 * @property tagName
		 * @type {string}
		 * @default 'li'
		 * @protected
		 */
		tagName: 'li',

		/**
		 * @property link
		 * @type {models.Provider}
		 * @default null
		 * @public
		 */
		link: null,

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
		 *      @param options.model {models.Provider}
		 *      @param [options.link=models.Link] {models.Link}
		 * @public
		 */
		initialize: function(options) {
			this.listenTo(this.model, 'change',
				this.render, this);
			this.listenTo(this.link, 'change',
				this.render, this);
			this.link = options.link || this.model.link();
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			Backbone.View.prototype.render.apply(this, arguments);
			this.$el.html(template(_.extend(
				this.model.richAttributes(),
				{}
			)));
			var $buttons = this.$el.find('form > div.buttons');
			var data = this.model.get('auth').data;
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
			// TODO: Create link
			console.log(this._authData());
			this.$el.removeClass('editing');
		},

		/**
		 * @method _authData
		 * @private
		 */
		_authData: function() {
			var $inputs = $('form input');
			var data = this.model.get('auth').data;
			var result = {};
			for(var i = 0; i < data.length; i++) {
				result[data[i].name] = $inputs.filter('[name=' + data[i].name + ']').val();
			}
			return result;
		}
	});

	return View;
});