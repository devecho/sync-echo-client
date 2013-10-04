define(['lib/handlebars'], function(Handlebars) {

	var localization = {
		'term.links':       'Links',
		'term.jobs':        'Jobs',
		'term.settings':    'Settings',
		'term.username':    'Username',
		'term.password':    'Password',
		'term.url':         'URL',
		'term.title':       'Title',
		'term.description': 'Description',

		'action.save':    'Save',
		'action.cancel':  'Cancel',
		'action.confirm': 'Confirm',
		'action.delete':  'Delete',
		'action.edit':    'Edit',
		'action.link':    'Link',
		'action.filter':  'Filter',

		'common.noneselected': 'None selected',

		'navigation.links.description':    'Connect to your accounts',
		'navigation.jobs.description':     'Sync your stuff',
		'navigation.settings.description': 'Configure profile and preferences',

		'links.create.label':       'Create link',
		'links.create.description': 'Select a provider where you have an account',

		'jobs.action.create':        'Create job',
		'jobs.details.back':         'Back to jobs',
		'jobs.details.source.label': 'Source',
		'jobs.details.target.label': 'Target',
		'jobs.edit.back':            'Back to jobs',
		'jobs.edit.source.headline': 'Select the source',
		'jobs.edit.source.change':   'Select link',
		'jobs.edit.target.headline': 'Select the target',
		'jobs.edit.target.change':   'Select link',
		'jobs.edit.info.headline':   'Name and description'
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