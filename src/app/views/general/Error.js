/**
 * @module views/general/Error
 * @requires backbone
 * @requires lib/handlebars
 */
define([
	'backbone',
	'lib/handlebars',
	'localization',
	'tpl!general/error'
], function(Backbone, Handlebars, local, template) {

	/**
	 * @class views.general.Error
	 * @extends Backbone.View
	 * @constructor
	 */
	var View = Backbone.View.extend({

		/**
		 * @property className
		 * @type {string}
		 * @default 'nav'
		 * @protected
		 */
		className: 'error',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click i.icon-close': 'destroy'
		},

		/**
		 * @method initialize
		 * @param options {Object}
		 * @public
		 */
		initialize: function(options) {
			this.listenTo(this, 'destroy', function() {
				if(this.constructor.currentErrorView === this) {
					this.constructor.currentErrorView = null;
				}
			}, this);
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			this.$el.html(template({
				message: local('general.error')
			}));
			return this;
		},

		/**
		 * @method show
		 * @chainable
		 * @public
		 */
		show: function() {
			if(this.constructor.currentErrorView !== null) {
				this.constructor.currentErrorView.destroy();
			}
			this.constructor.currentErrorView = this;
			this.render().appendTo('body');
			return this;
		}
	}, {
		/**
		 * @property currentErrorView
		 * @type {views.general.Error}
		 * @default null
		 * @protected
		 * @static
		 */
		currentErrorView: null
	});

	return View;
});