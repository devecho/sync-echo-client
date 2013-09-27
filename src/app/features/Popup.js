/**
 * @module features/Popup
 * @requires lib/jquery
 */
define([
	'lib/jquery'
], function($) {

	/**
	 * @class Popup
	 * @param popupEl {HTMLElement}
	 * @constructor
	 */
	var Popup = function(popupEl) {

		/**
		 * @property $popup
		 * @type {jQuery}
		 * @private
		 * @final
		 */
		var $popup = $(popupEl);

		/**
		 * @property visible
		 * @type {boolean}
		 * @default false
		 * @private
		 */
		var visible = false;

		/**
		 * @method toggle
		 * @param $anchor {jQuery}
		 * @public
		 */
		this.toggle = function($anchor) {
			visible ? this.hide($anchor) : this.show($anchor);
		}

		/**
		 * @method show
		 * @param $anchor {jQuery}
		 * @public
		 */
		this.show = function($anchor) {
			var orientation = $popup.data('popupOrientation');
			var align = $popup.data('popupAlign');
			if(align === 'center') {
				if((orientation === 'top') || (orientation === 'bottom')) {
					align = 'hCenter';
				}
				else {
					align = 'vCenter';
				}
			}
			position(orientation, align, $anchor);
			$popup.addClass('visible');
		}

		/**
		 * @method hide
		 * @param $anchor {jQuery}
		 * @public
		 */
		this.hide = function($anchor) {
			$popup.removeClass('visible');
		}


		/**
		 * @method position
		 * @param orientation {string}
		 * @param align {string}
		 * @param $anchor {jQuery}
		 * @private
		 */
		var position = function(orientation, align, $anchor) {
			var anchorOffset = $anchor.offset();
			var anchorWidth = $anchor.outerWidth();
			var anchorHeight = $anchor.outerHeight();
			$popup.addClass('visible');
			var popupWidth = $popup.outerWidth();
			var popupHeight = $popup.outerHeight();
			$popup.removeClass('visible');

			var top, left;
			switch(orientation) {
			case 'top':
				top = anchorOffset.top - popupHeight;
				break;
			case 'bottom':
				top = anchorOffset.top + anchorHeight;
				break;
			case 'left':
				left = anchorOffset.left - popupWidth;
				break;
			case 'right':
				left = anchorOffset.left + anchorWidth;
				break;
			}

			switch(align) {
			case 'top':
				top = anchorOffset.top;
				break;
			case 'bottom':
				top = anchorOffset.top + anchorHeight - popupHeight;
				break;
			case 'left':
				left = anchorOffset.left;
				break;
			case 'right':
				left = anchorOffset.left + anchorWidth - popupWidth;
				break;
			case 'hCenter':
				left = anchorOffset.left + (anchorWidth / 2) - (popupWidth / 2);
				break;
			case 'vCenter':
				top = anchorOffset.top + (anchorHeight / 2) - (popupHeight / 2);
				break;
			}

			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			var popupRight = left + popupWidth;
			var popupBottom = top + popupHeight;
			var rightOverlap = windowWidth - popupRight;
			var bottomOverlap = windowHeight - popupBottom;
			var width = 'auto';
			var height = 'auto';

			if(rightOverlap > 0) {
				if(rightOverlap > left) {
					left = 0;
					width = windowWidth;
				}
				else {
					left -= rightOverlap;
				}
			}
			if(bottomOverlap > 0) {
				if(bottomOverlap > top) {
					top = 0;
					height = windowHeight;
				}
				else {
					top -= bottomOverlap;
				}
			}

			$popup.css({
				top: top,
				left: left
			});
		}
	}

	var curPopup = null;

	$(document).on('click', function(e) {
		var $target = $(e.target);
		var $popup = $target.closest('.popup').add($target.filter('.popup'));
		var $anchor = $target.closest('[data-popup-selector]').add($target.filter('[data-popup-selector]'));
		if($popup.length === 0) {
			if($anchor.length > 0) {
				getter($anchor).toggle();
			}
			else {
				if(curPopup !== null) {
					curPopup.hide();
				}
			}
		}
	});

	/**
	 * @method getter
	 * @param anchorEl {jQuery, HTMLElement, string}
	 * @return {features.Popup}
	 * @public
	 */
	var getter = function(anchorEl) {
		var $anchor = $(anchorEl);

	}

	return getter;
});