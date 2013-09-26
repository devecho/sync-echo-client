define([], function() {
	var config = {
		service: 'http://localhost/service/api/1/'
	};

	return function(key) {
		return config[key];
	}
});