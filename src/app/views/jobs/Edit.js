/**
 * @module views/jobs/Edit
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
	'localization',
	'tpl!jobs/edit'
], function(Backbone, Handlebars, app, Job, Links, local, template) {
	'use strict';

	/**
	 * @namespace views.jobs
	 * @class Edit
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
		 * @default 'editJob'
		 * @protected
		 */
		className: 'editJob',

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
			this._links = new Links();

			this.listenTo(this._links, 'change', this.render, this);

			this._links.fetch({
				success: function() {
					self._currentSource = self._links.get(self.model.get('source').link) || null;
					self._currentTarget = self._links.get(self.model.get('target').link) || null;
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
				job:   this.model.richAttributes(),
				links: this._links.richAttributes(),
				currentSource: this._currentSource
					? this._currentSource.richAttributes() : null,
				currentTarget: this._currentTarget
					? this._currentTarget.richAttributes() : null
			}));
			this.$el.toggleClass('isNew', this.model.isNew());
			this.renderSource();
			this.renderTarget();
			this.$el.find('form').validate();
			return this;
		},

		/**
		 * @method renderSource
		 * @chainable
		 * @public
		 */
		renderSource: function() {
			var $sourceEl = this.$el.find('.source a.select');
			if(this._currentSource === null) {
				$sourceEl.html(local('common.noneselected'));
			}
			else {
				$sourceEl.html(this._currentSource.get('provider').name + ' (' +
				               this._currentSource.identifier() + ')');
				$sourceEl.attr('data-value', this._currentSource.id);
			}
		},

		/**
		 * @method renderTarget
		 * @chainable
		 * @public
		 */
		renderTarget: function() {
			var $targetEl = this.$el.find('.target a.select');
			if(this._currentTarget === null) {
				$targetEl.html(local('common.noneselected'));
			}
			else {
				$targetEl.html(this._currentTarget.get('provider').name + ' (' +
				               this._currentTarget.identifier() + ')');
				$targetEl.attr('data-value', this._currentTarget.id);
			}
		},

		/**
		 * @method selectSource
		 * @param e {MouseEvent}
		 * @public
		 */
		selectSource: function(e) {
			this._currentSource = this._links.get(
				$(e.currentTarget).data('linkId'));
			this.renderSource();
			this.$el.find('form').validate();
		},

		/**
		 * @method selectTarget
		 * @param e {MouseEvent}
		 * @public
		 */
		selectTarget: function(e) {
			this._currentTarget = this._links.get(
				$(e.currentTarget).data('linkId'));
			this.renderTarget();
			this.$el.find('form').validate();
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
		 * @method toggleDelete
		 * @param e {MouseEvent}
		 * @public
		 */
		toggleDelete: function(e) {
			this.$el.find('.deleteContainer').toggleClass('confirm');
		},

		/**
		 * @method submit
		 * @param e {MouseEvent}
		 * @public
		 */
		submit: function(e) {
			this.model.save({
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
			}, {
				success: function() {
					app.router.navigate('jobs', true);
				}
			});
		}
	});

	return View;
});