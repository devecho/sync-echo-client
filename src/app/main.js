requirejs.config({
	baseUrl: '',

	shim: {
		'lib/handlebars': {
			exports: 'Handlebars'
		},
		'lib/backbone':   {
			exports: 'Backbone',
			deps:    ['lib/jquery', 'lib/underscore']
		},
		'lib/jquery':     {
			exports: 'jQuery',
			deps:    []
		},
		'lib/underscore': {
			exports: '_',
			deps:    []
		},
		'lib/bootstrap':  {
			deps: ['lib/jquery']
		}
	},

	paths: {
		'backbone': 'plugins/backbone-extension',
		'txt':      'plugins/requirejs.text',
		'tpl':      'core/tpl.require'
	}
});

define('app', [], function() {
	return new function() {
		var config = {
			paths: {
			}
		};

		return {
			servicePath: function() {

			}
		};
	};
});

requirejs(['app', 'localization', 'features/Popup'], function(app, localization, Popup) {
	requirejs(['backbone', 'routers/Main'], function(Backbone, MainRouter) {
		app.router = new MainRouter();
		Backbone.history.start();

		// TEMP
		$(document).on('click', '.providers li', function(e) {
			$(e.currentTarget).toggleClass('checked');
		});
	});
});