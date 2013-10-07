/**
 * @module utils
 * @requires lib/underscore
 */
define(['lib/underscore'], function(_) {
	return {

		/**
		 * @method parseSmart
		 * @param value {string}
		 * @return {Object}
		 * @public
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
		},

		/**
		 * @method matchFilter
		 * @param str {string}
		 * @param values {string[]}
		 * @return {boolean}
		 * @public
		 */
		matchFilter: function(str, values) {
			var parts = str.split(' ');
			for(var i = 0; i < parts.length; i++) {
				var part = new RegExp(this.escapeRegExp(parts[i]), 'i');
				var match = false;
				for(var j = 0; j < values.length; j++) {
					if(values[j].match(part)) {
						match = true;
						break;
					}
				}
				if(!match) {
					return false;
				}
			}
			return true;
		},

		/**
		 * @method escapeRegExp
		 * @param str {string}
		 * @return {string}
		 * @public
		 */
		escapeRegExp: function(str) {
			return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}
	};
});