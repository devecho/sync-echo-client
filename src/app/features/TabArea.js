/**
 * @module features/TabArea
 * @requires lib/jquery
 */
define([
	'lib/jquery'
], function($) {

	$(document).on('keydown', '[data-tabarea=true] [data-tabindex]', function(e) {
		if(e.keyCode === 9) {
			var backwards = e.shiftKey;
			var $target = $(e.currentTarget);
			var $tabArea = $target.closest('[data-tabarea]');
			var $tabEls = $tabArea.find('[data-tabindex]');
			$tabEls.sort(function(a, b) {
				var indexA = $(a).data('tabindex');
				var indexB = $(b).data('tabindex');
				return indexA - indexB;
			});
			var arrPos = $.inArray($target[0], $tabEls);
			if(backwards) {
				if(arrPos === 0) {
					arrPos = $tabEls.length - 1;
				}
				else {
					arrPos--;
				}
			}
			else {
				if(arrPos === ($tabEls.length - 1)) {
					arrPos = 0;
				}
				else {
					arrPos++;
				}
			}
			var $next = $tabEls.eq(arrPos);
			if(!$next.attr('href')) {
				$next.attr('href', '');
			}
			window.setTimeout(function() {
				$next.focus();
			});
			e.preventDefault();
			e.stopPropagation();
		}
	});

	return null;
})
;