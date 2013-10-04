/**
 * @module features/Accordion
 * @requires lib/jquery
 */
define([
	'lib/jquery'
], function($) {
	'use strict';

	$(document).on('click', 'ul.accordion > li > header', function(e) {
		var $item = $(e.target).closest('li');
		var $accordion = $(e.target).closest('ul.accordion');
		var $items = $accordion.find('> li');
		$items.removeClass('open');
		$item.addClass('open');
	});

	return null;
});