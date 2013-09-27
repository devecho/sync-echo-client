/**
 * @module utils
 */
define([], function() {
	return {

		/**
		 * @method parseSmart
		 * @param value {string}
		 */
		parseSmart: function(value) {
			if(value === 'true') {
				return true;
			}
			if(value === 'false') {
				return false;
			}
			var float = parseFloat(value);
			if(float.toString().length === value.length) {
				return float;
			}
			return value;
		}
	};
});