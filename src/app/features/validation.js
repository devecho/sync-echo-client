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
	'use strict';

	var defaultOptions = {
		required: false
	};

	/**
	 * @method validate
	 * @param input {HTMLInputElement}
	 * @param visualize {boolean}
	 * @return {boolean}
	 * @private
	 */
	var validate = function(input, visualize) {
		var $input = $(input);
		var val = $input.val();
		var options = _.defaults($input.data('validate'), defaultOptions);
		var valid = true;

		var validRequired = options.required && (val !== '');

		valid = valid && validRequired;

		if(visualize) {
			$input.toggleClass('invalid', !valid);
		}
		return valid;
	}

	/**
	 * @for jQuery.fn
	 * @method validate
	 * @param visualize {boolean}
	 * @return {boolean}
	 * @public
	 */
	$.fn.validate = function(visualize) {
		var $form = this.filter('form');
		var valid = true;
		$form.find('input').each(function() {
			valid = valid && validate(this, visualize);
		});
		return valid;
	}

	$(document).on('keydown keypress paste change', 'form input[data-validate]', function(e) {
		window.setTimeout(function() {
			var $form = $(e.currentTarget).closest('form');
			$form.find('a.submit').toggleClass('ghosted', !$form.validate(false));
			validate(e.currentTarget, true);
		}, 0);
	});

	Handlebars.registerHelper('validate', function(options) {
		return JSON.stringify(options.hash);
	});

	return validate;
})
;