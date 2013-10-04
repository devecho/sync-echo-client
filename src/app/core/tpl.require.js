/**
 * @module core/tpl.require
 * @requires lib/handlebars
 */
define([
	'lib/handlebars'
], {
	load: function(name, req, onload, config) {
		req(['txt!templates/' + name + '.hbs'], function(value) {
			onload(Handlebars.compile(value));
		});
	}
});