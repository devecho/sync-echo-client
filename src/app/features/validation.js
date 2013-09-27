/**
 * @module features/Validation
 * @requires lib/jquery
 * @requires lib/handlebars
 * @requires utils
 */
define([
	'lib/jquery',
	'lib/underscore',
	'lib/handlebars',
	'utils'
], function($, _, Handlebars, utils) {

	var defaultOptions = {
		required: false,
		format:   null
	};

	/**
	 * @method validate
	 * @param input {HTMLInputElement}
	 */
	var validate = function(input) {
		var $input = $(input);
		var val = $input.val();
		var options = _.defaults(JSON.parse($input.data('validate') || '{}'), defaultOptions);
		var invalid = false;

		var checkRequired = options.required && (val === '');

		invalid = invalid && checkRequired;
		$input.toggleClass('invalid', invalid);
	}

	$.fn.validate = function() {
		var $form = this.filter('form');
		$form.find('input').each(function() {
			validate(this);
		});
	}

	Handlebars.registerHelper('validate', function() {
		var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
		var params = {};
		for(var i = 0; i < args.length; i++) {
			var split = args[i].split('=');
			params[split[0]] = utils.parseSmart(split[1]);
		}
		return JSON.stringify(params).replace('"', '&quot;');
	});

	return validate;
})
;