/**
 * @module features/Buttons
 * @requires lib/jquery
 */
define([
	'lib/jquery'
], function($) {
	'use strict';

	$(document).on('mousedown', 'a.btn.ghosted', function(mousedownE) {
		$(mousedownE.currentTarget).one('click', function(clickE) {
			clickE.stopPropagation();
			clickE.preventDefault();
		});
	});

	return null;
})
;