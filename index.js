var client = require('./client');

var initializer = function(api_key) {
	return new client(api_key);
}

module.exports = initializer;