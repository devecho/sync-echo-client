requirejs.config({
	baseUrl: 'build/',

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
		},

		'jasmine': {
			exports: 'jasmine'
		},

		'jasmine-html': {
			deps: ['jasmine']
		}
	},

	paths: {
		'backbone': 'plugins/backbone-extension',
		'txt': 'plugins/requirejs.text',

		'jasmine': '../lib/jasmine',
		'jasmine-html': '../lib/jasmine-html'
	}
});

requirejs([
	'../Runner',
	'lib/jquery',
	'jasmine',
	'jasmine-html'
], function(Runner, $, jasmine) {
	$.ajax({
		url: 'specs.json',
		dataType: 'json'
	})
		.done(function(specPaths) {
			window.runner = new Runner(specPaths, function() {
				var env = jasmine.getEnv();
				var htmlReporter = new (jasmine.HtmlReporter)();
				env.specFilter = function(spec) {
					return htmlReporter.specFilter(spec);
				};
				env.addReporter(htmlReporter);
				env.execute();
			});
		});
});