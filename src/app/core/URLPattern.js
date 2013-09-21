/**
 * @module core/URLPattern
 */
define([], function(internal, exports) {

	/**
	 * @class URLPattern
	 * @param url {string}
	 * @constructor
	 */
	var URLPattern = function(url) {
		var urlSplit = url.split('/');
		var params = [];
		for(var i = 0; i < urlSplit.length; i++) {
			var param = urlSplit[i].match(/:[a-zA-Z]*/);
			if(param != null) {
				param =
				param[0].substr(1);
				params.push(param);
			}
		}

		/**
		 * @method generate
		 * @param values {Object}
		 * @return {string}
		 * @public
		 */
		this.generate = function(values) {
			values ||
			(values = {});
			var result = url;
			var curValue;
			for(var i = 0; i < params.length; i++) {
				curValue =
				(typeof values[params[i]] === 'function') ? values[params[i]]() : values[params[i]];
				if(curValue) {
					result =
					result.replace(':' + params[i], curValue);
				}
				else {
					var index = result.indexOf(':' + params[i]);
					result =
					result.substr(0, (index >= 0) ? index : result.length);
				}
			}
			return result;
		}
	}

	return URLPattern;
});