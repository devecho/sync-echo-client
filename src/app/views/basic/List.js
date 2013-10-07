/**
 * @module views/basic/List
 * @requires backbone
 * @requires views/basic/ListItem
 */
define([
	'backbone',
	'views/basic/ListItem'
], function(Backbone, ListItem) {

	/**
	 * @class views.basic.List
	 * @extends Backbone.View
	 * @abstract
	 * @constructor
	 */
	var List = Backbone.View.extend({
		tagName:   'ul',
		className: '',

		newToTop: true,

		/**
		 * @method initialize
		 * @param options {Object}
		 * @public
		 */
		initialize: function(options) {
			var self = this;
			Backbone.View.prototype.initialize.call(this, options);

			this.listenTo(this.collection, 'change', function(model) {
				self.collection.sort();
			});
			this.listenTo(this.collection, 'add', this.addItem, this);
			this.listenTo(this.collection, 'remove', this.removeItem, this);
			this.listenTo(this.collection, 'sort', this.onSort, this);
			this.listenTo(this.collection, 'reset', this.render, this);
		},

		/**
		 * Renders the view completely
		 *
		 * @method render
		 * @public
		 * @chainable
		 */
		render: function() {
			this.renderTemplate();
			this.amend();
			Backbone.View.prototype.render.call(this);
			return this;
		},

		/**
		 * Inserts the template without applying any states
		 *
		 * @method renderTemplate
		 * @protected
		 */
		renderTemplate: function() {
		},

		/**
		 * Removes all views whose models are not in the collection anymore
		 * Adds a view for each each new model in the collection and renders it
		 * Sorts and appends all sub views afterwards
		 *
		 * @method amend
		 * @chainable
		 * @public
		 */
		amend: function() {
			var self = this;

			// Create views for all new models
			this.collection.each(function(model) {
				// Check if a view for the model does not exist
				if(self.viewByModelId(model.id) === null) {
					// Add view for the new model and prevent from sorting for each new model
					self.addItem(model, {sort: false});
				}
			});

			var subViews = _.clone(this.subView(this.constructor.ulSelector));
			// Remove all views whose models are not in the collection anymore
			_.each(subViews, function(subView) {
				if(!self.collection.get(subView.model)) {
					// Prevent form updating the scrollbar at each removal
					self.removeItem(subView.model);
				}
			});

			this.sortSubViews();
			return this;
		},

		/**
		 * @method addItem
		 * @param model {Backbone.Model}
		 * @public
		 */
		addItem: function(model) {
			this.addView(model);
		},

		/**
		 * @method removeItem
		 * @param model {Backbone.Model}
		 * @chainable
		 * @public
		 */
		removeItem: function(model, options) {
			this.viewByModelId(model.id).destroy();
			return this;
		},

		/**
		 * @method onSort
		 * @protected
		 */
		onSort: function() {
			this.sortSubViews();
		},

		/**
		 * Sorts the internal sub views and inserts them into the list element without re-rendering
		 *
		 * @method sortSubViews
		 * @chainable
		 * @public
		 */
		sortSubViews: function() {
			var self = this;
			var ulSelector = this.constructor.ulSelector;
			var subViews = this.subView(ulSelector);
			var modifier = (self.newToTop ? 1 : -1);
			if(this.collection.comparator) {
				subViews.sort(function(a, b) {
					var aNew = a.model.isNew();
					var bNew = b.model.isNew();
					if(aNew && !bNew) {
						return -1 * modifier;
					}
					else if(!aNew && bNew) {
						return 1 * modifier;
					}
					return self.collection.comparator.call(self.collection, a.model, b.model);
				});
			}
			var $list = this.$el.find(ulSelector).eq(0);
			$list.html('');
			this.delegateEvents();
			_.each(subViews, function(subView) {
				subView.delegateEvents();
				subView.eachSubView(function(subSubView) {
					subSubView.delegateEvents();
				});
				subView.appendTo($list);
			});
			return this;
		},

		/**
		 * @method afterAppend
		 * @public
		 */
		afterAppend: function() {
			this.$el.tinyscrollbar();
		},

		/**
		 * @method addView
		 * @param model {Backbone.Model}
		 * @param [options] {Object
		 *      @param [options.sort=true] {boolean}
		 * @returns {self.ItemView}
		 * @protected
		 */
		addView: function(model, options) {
			options = options || {};
			var self = this;
			var view = new (self.constructor.itemViewCtr(model))({
				model: model
			});

			this.subView(this.constructor.ulSelector, view);

			if(options.sort !== false) {
				this.sortSubViews();
			}
			return view
		},

		/**
		 * @method viewByModelId
		 * @param id {string}
		 * @returns {views.basic.ListItem}
		 * @public
		 */
		viewByModelId: function(id) {
			var match = null;
			_.each(this.itemViews(), function(subView) {
				if(subView.model.id === id) {
					match = subView;
					return false;
				}
			});
			return match;
		},

		/**
		 * @method itemViews
		 * @returns {views.basic.ListItem}
		 * @protected
		 */
		itemViews: function() {
			return this.subView(this.constructor.ulSelector);
		},

		/**
		 * @method listElement
		 * @return {jQuery}
		 * @public
		 */
		listElement: function() {
			return this.$el.find(this.constructor.ulSelector);
		},

		/**
		 * @method scrollTo
		 * @param id {string}
		 * @public
		 */
		scrollTo: function(id) {
			var view = this.viewByModelId(id);
			if(view !== null) {
				view.el.scrollIntoView();
			}
		},

		/**
		 * @method filter
		 * @param e {KeyboardEvent, string}
		 * @public
		 */
		filter: function(e) {
			var items = this.itemViews();
			for(var i = 0; i < items.length; i++) {
				items[i].filter((typeof e === 'string') ? e : $(e.currentTarget).val());
			}
		}
	}, {
		/**
		 * @property ItemView
		 * @type {Function}
		 * @protected
		 * @static
		 */
		ItemView: ListItem,

		/**
		 * @method itemViewCtr
		 * @param model {Backbone.Model}
		 * @protected
		 */
		itemViewCtr: function(model) {
			return this.ItemView;
		},

		/**
		 * @property ulSelector
		 * @type {string}
		 * @default ''
		 * @protected
		 * @static
		 */
		ulSelector: ''
	});

	return List;
});