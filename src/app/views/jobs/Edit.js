/**
 * @module views/jobs/Create
 * @requires backbone
 * @requires lib/handlebars
 * @requires models/Job
 * @requires collections/Links
 */
define([
	'backbone',
	'lib/handlebars',
	'app',
	'models/Job',
	'collections/Links',
	'tpl!jobs/create'
], function(Backbone, Handlebars, app, Job, Links, template) {
	'use strict';

	/**
	 * @namespace views.jobs
	 * @class Create
	 * @constructor
	 * @extends Backbone.View
	 */
	var View = Backbone.View.extend({

		/**
		 * @property tagName
		 * @type {string}
		 * @default 'ul'
		 * @protected
		 */
		tagName: 'ul',

		/**
		 * @property className
		 * @type {string}
		 * @default 'createJob'
		 * @protected
		 */
		className: 'createJob',

		/**
		 * @property events
		 * @type {Object}
		 * @protected
		 */
		events: {
			'click .source .links li':                   'selectSource',
			'click .target .links li':                   'selectTarget',
			'click .source a.select, .source .links li': 'toggleSourceLinks',
			'click .target a.select, .target .links li': 'toggleTargetLinks',
			'click a.submit':                            'submit'
		},

		/**
		 * @property _links
		 * @type {collections.Links}
		 * @protected
		 */
		_links: null,

		/**
		 * @property _currentSource
		 * @type {models.Link}
		 * @default null
		 * @protected
		 */
		_currentSource: null,

		/**
		 * @property _currentTarget
		 * @type {models.Link}
		 * @default null
		 * @protected
		 */
		_currentTarget: null,

		/**
		 * @method initialize
		 * @param options {Object}
		 * @chainable
		 * @public
		 */
		initialize: function(options) {
			var self = this;
			this.model = new Job();
			this._links = new Links();

			this.listenTo(this._links, 'change', this.render, this);

			this._links.fetch({
				success: function() {
					self.render();
				}
			});
			return this;
		},

		/**
		 * @method render
		 * @chainable
		 * @public
		 */
		render: function() {
			this.$el.html(template({
				links: this._links.richAttributes(),
				currentSource: this._currentSource
					? this._currentSource.richAttributes() : null,
				currentTarget: this._currentTarget
					? this._currentTarget.richAttributes() : null
			}));
			return this;
		},

		/**
		 * @method selectSource
		 * @param e {MouseEvent}
		 * @public
		 */
		selectSource: function(e) {
			this._currentSource = this._links.get(
				$(e.currentTarget).data('linkId'));
			this.render();
		},

		/**
		 * @method selectTarget
		 * @param e {MouseEvent}
		 * @public
		 */
		selectTarget: function(e) {
			this._currentTarget = this._links.get(
				$(e.currentTarget).data('linkId'));
			this.render();
		},

		/**
		 * @method toggleSourceLinks
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleSourceLinks: function(e) {
			this.$el.find('.source .links').toggleClass('visible');
		},

		/**
		 * @method toggleTargetLinks
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleTargetLinks: function(e) {
			this.$el.find('.target .links').toggleClass('visible');
		},

		/**
		 * @method submit
		 * @param e {MouseEvent}
		 * @public
		 */
		submit: function(e) {
			new Job({
				name:        this.$el.find('input.name').val(),
				description: this.$el.find('input.description').val(),
				source:      {
					type: 'source',
					link: this._currentSource.id,
				             data: []
				},
				target:      {
					type: 'target',
					link: this._currentTarget.id,
					data: []
				}
			}).save(null, {
					success: function() {
						app.router.navigate('jobs', true);
					}
				});
		}
	});

	return View;
});