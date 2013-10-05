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

requirejs(['app', 'localization', 'features/Popup', 'features/Validation',
           'features/Buttons', 'features/TabArea'], function(app, localization, Popup) {
	requirejs(['backbone', 'routers/Main', 'views/general/Error', 'views/general/Login'
	], function(Backbone, MainRouter, ErrorView, LoginView) {
		Backbone.onerror = function(method, options, model) {
			new ErrorView({
				info: {
					method:  method,
					options: options,
					model:   model
				}
			}).show();
		}

		new LoginView().render().appendTo('body').once('login', function() {
			app.router = new MainRouter();
			Backbone.history.start();
		});
	});
});