define(['lib/handlebars'], function(Handlebars) {

	var localization = {
		'term.links':    'Links',
		'term.jobs':     'Jobs',
		'term.settings': 'Settings',
		'term.username': 'Username',
		'term.password': 'Password',
		'term.url':      'URL',

		'action.edit': 'Edit',
		'action.link': 'Link',

		'links.action.create': 'Add a link'
	};

	var value = function(key) {
		return localization[key] || key;
	}

	Handlebars.registerHelper('local',
		function() {
			return value(
				Array.prototype.join.call(
					Array.prototype.slice.call(arguments, 0, arguments.length - 1), '.'));
		}
	);

	return value;
});