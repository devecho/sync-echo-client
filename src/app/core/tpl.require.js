/**
 * @module core/hbs.require
 * @requires lib/handlebars
 */
define([
	'lib/handlebars'
], {
	load: function(name, req, onload, config) {
		req([name], function(value) {
			onload(Handlebars.compile(value));
		});
	}
});