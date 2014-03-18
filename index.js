var Client = require('./client');

module.exports = function(api_key, language) {
	return new Client(api_key, language);
}