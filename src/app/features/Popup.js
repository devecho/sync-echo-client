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
			var anchorHeight = $popup.outerHeight();
			$popup.removeClass('visible');

			switch(orientation) {
			case 'bottom':
				$popup.css({
					top: anchorOffset.top + anchorHeight
				});
				break;
			}

			switch(align) {
			case 'hCenter':
				$popup.css({
					left: anchorOffset.left + (anchorWidth / 2) - (popupWidth / 2)
				});
				break;
			}
		}
	}

	var curPopup = null;

	$(document).on('click', function(e) {
		var $target = $(e.target);
		var $popup = $target.closest('.popup').add($target.filter('.popup'));
		var $anchor = $target.closest('[data-popupSelector]').add($target.filter('[data-popupSelector]'));
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