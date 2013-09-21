/**
 * @module core/Path
 */
define([], function() {
	/**
	 * @class Path
	 * @constructor
	 */
	var Path = function() {

		/**
		 * @property serviceAPIPath
		 * @type {string}
		 * @private
		 */
		var protocol = null;

		/**
		 * @property pathParts
		 * @type {Array}
		 * @private
		 */
		var pathParts = [];

		/**
		 * @property queryParams
		 * @type {Object}
		 * @private
		 */
		var queryParams = {};

		/**
		 * @method addPath
		 * @param path {string}
		 * @public
		 */
		this.addPath = function(path) {
			pathParts.push.apply(pathParts, stripPath(path));
		}

		/**
		 * @method addQueryParam
		 * @param key {string}
		 * @param value {string}
		 * @public
		 */
		this.addQueryParam = function(key, value) {
			queryParams[key] =
			value;
		}

		/**
		 * @method toString
		 * @return {string}
		 * @public
		 */
		this.toString = function() {
			var result = '';
			if(protocol !== null) {
				result +=
				protocol + '://';
			}
			result +=
			pathParts.join('/');
			var params = [];
			for(var i in queryParams) {
				params.push(i + '=' + queryParams[i]);
			}
			if(params.length > 0) {
				result +=
				'?' + params.join('&');
			}
			return result;
		}

		/**
		 * @method stripPath
		 * @param path {string}
		 * @return {string}
		 * @private
		 */
		var stripPath = function(path) {
			var protocolMatch = path.match(/^([a-zA-Z0-9])+:\/\//);
			if(protocolMatch != null) {
				protocol =
				protocolMatch[0].replace('://', '');
				path =
				path.replace(protocolMatch[0], '');
			}

			var parts = path.split('/');
			var result = [];
			for(var i = 0; i < parts.length; i++) {
				if(parts[i].length > 0) {
					result.push(parts[i]);
				}
			}
			return result;
		}

		/**
		 * @method initialize
		 * @private
		 */
		var initialize = function() {
			for(var i = 0; i < arguments.length; i++) {
				if(typeof arguments[i] == 'string') {
					this.addPath(arguments[i]);
				}
				else if(typeof arguments[i] == 'object') {
					for(var j in arguments[i]) {
						this.addQueryParam(j, arguments[i][j]);
					}
				}
			}
		}

		initialize.apply(this, arguments);
	};

	return Path;
});