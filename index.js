var Client = require('./client');

module.exports = function(api_key) {
	return new Client(api_key);
}