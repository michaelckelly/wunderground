 /**
 * Dependencies
 */
var request = require('request');

/**
 * Client constructor
 * @param {String} api_key
 * @param {String} language
 * @api public
*/
var Client = module.exports = function(api_key, language) {
	if(!api_key || api_key == '') {
		throw new Error('No Wunderground API key provided.');
	}
	this.key = api_key;

	this.actions = ['forecast', 'conditions', 'forecast10day', 'hourly', 'hourly10day', 'almanac', 'alerts', 'astronomy', 'rawtide', 'tide', 'yesterday', 'webcams', 'geolookup', 'currenthurricane', 'history']
	this.uri = {
		protocol  : 'https://',
		base      : 'api.wunderground.com/api/',
		separator : '/q/',
		format    : '.json'
	};

	// Set our language if given otherwise default to English
	this.language = (language) ? 'lang:' + language : 'lang:EN';

	// Generate helper functions for each wunderground API verb
	var self = this;
	this.actions.forEach(function(method) {
		self[method] = function() {
			var args = [method];
			for(var arg in arguments) {
				args.push(arguments[arg]);
			}
			return (self.execute).apply(self, args);
		}
	});
}

/**
 * Executes a wunderground API call
 * @param {String|Array} action
 * @param {Object} query
 * @param {Function} cbk callback
 * @api public
 */
Client.prototype.execute = function(action, query, cbk) {
	var self = this;
	this._buildQuery(query, action, function(err, parsed_action, parameters) {
		if(err) {
			return cbk(err);
		} else {
			var api_request = self._buildUri(parsed_action, parameters);
			request({ uri : api_request, json : true }, function(err, body, res) {
				if(!err) {
					if(res && res.response && res.response.error) {
						return cbk(res.response);
					} else return cbk(null, res);
				} else {
					return cbk(err);
				}
			});
		}
	});
}

/**
 * Build a valid query out of our query wrapper
 * @param {Object} q
 * @param {String|Array} action
 * @param {Function} cbk
 * @api private
 */
Client.prototype._buildQuery = function(q, action, cbk) {
	var parameters    = []
	  , parsed_action = '';

	parsed_action = (Array.isArray(action)) ? action.join('/') : action;

	// "currenthurricane" has one static parameter called 'view'
	if(parsed_action == 'currenthurricane') {
		parameters.push('view');
	} else if(parsed_action == 'history') {
		parsed_action == parsed_action +'_' + q.date;
	}

	if(q.city && q.state) {
		parameters.push(q.state, q.city);
	} else if(q.zip) {
		parameters.push(q.zip);
	} else if(q.country && q.city) {
		parameters.push(q.country, q.city);
	} else if(q.lat && q.lng) {
		parameters.push(q.lat + ',' + q.lng);
	} else if(q.airport) {
		parameters.push(q.airport);
	} else if(q.pws) {
		parameters.push('pws:'+ q.pws);
	} else if(q.city) {
		parameters.push(q.city);
	}

	// Any valid request has at least one parameter
	if(parameters.length == 0) {
		return cbk('Invalid query object');
	} else return cbk(null, parsed_action, parameters);
}

/**
 * Build a wunderground API request URI
 * @param {String} action
 * @param {Array} pieces
 * @api private
 */
Client.prototype._buildUri = function(action, pieces) {
	return (this.uri.protocol + this.uri.base + this.key + '/' + action + '/' + this.language + this.uri.separator + pieces.join('/') + this.uri.format);
}