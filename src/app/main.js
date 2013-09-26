requirejs.config({
	baseUrl: '',

	shim: {
		'lib/handlebars': {
			exports: 'Handlebars'
		},
		'lib/backbone': {
			exports: 'Backbone',
			deps: ['lib/jquery', 'lib/underscore']
		},
		'lib/jquery': {
			exports: 'jQuery',
			deps: []
		},
		'lib/underscore': {
			exports: '_',
			deps: []
		},
		'lib/bootstrap': {
			deps: ['lib/jquery']
		}
	},

	paths: {
		'backbone': 'plugins/backbone-extension',
		'txt': 'plugins/requirejs.text'
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

requirejs(['localization', 'features/Popup'], function(localization, Popup) {
	requirejs(['backbone', 'routers/Main'], function(Backbone, MainRouter) {
		var mainRouter = new MainRouter();
		Backbone.history.start();

		// TEMP
		$(document).on('click', '.providers li', function(e) {
			$(e.currentTarget).toggleClass('checked');
		});
	});
});