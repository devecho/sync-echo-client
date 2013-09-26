/**
 * @module runner
 */
define([], function() {

	var Runner = function(specPaths, onload) {

		var initialize = function() {
			for(var i = 0; i < specPaths.length; i++) {
				specPaths[i] = '../specs/' + specPaths[i];
			}
				requirejs(specPaths, function() {
					onload();
				});
		}

		initialize.apply(this, arguments);
	}

	return Runner;
});