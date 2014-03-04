var request = require('request');

var Client = module.exports = function(api_key) {
	if(!api_key || api_key == '') {
		throw new Error('No Wunderground API key provided.');
	}
	this.key = api_key;

	// history is special, i.e. history_YYYYMMDD
	// currenthurricane accepts no args, just /currenthurricane/view.(format) (i.e. json)
	this.actions = ['forecast', 'conditions', 'forecast10day', 'hourly', 'hourly10day', 'almanac', 'alerts', 'astronomy', 'rawtide', 'tide', 'yesterday', 'webcams', 'geolookup', 'currenthurricane']
	this.uri = {
		protocol  : 'https://',
		base      : 'api.wunderground.com/api/',
		separator : '/q/',
		format    : '.json'
	};


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
 * Generic function to execute a wunderground API call
 * @param type
 */
Client.prototype.execute = function(action, q, cbk) {
	var self = this;
	this._buildQuery(q, action, function(err, pieces) {
		if(err) {
			return cbk(err);
		} else {
			var api_request = self._buildApiUri(action, pieces);
			request({ uri : api_request, json : true }, function(err, body, res) {
				if(!err) {
					return cbk(null, res);
				} else {
					// process error?
					return cbk(err);
				}
			});
		}
	});
}

/**
 * Build a valid query out of our query wrapper
 */
Client.prototype._buildQuery = function(q, action, cbk) {
	if(action == 'currenthurricane') {
		return cbk(null, ['view']);
	}

	// go case by case
	if(q.city && q.state) {
		return cbk(null, [q.state, q.city]);
	} else if(q.zip) {
		return cbk(null, [q.zip]);
	} else if(q.airport) {
		return cbk(null, [q.airport]);
	} else if(q.country && q.city) {
		return cbk(null, [q.country, q.city]);
	} else if(q.lat && q.lng) {
		// Lat & Lng are passed as lat,lng
		return cbk(null, [q.lat + ',' + q.lng])
	} else if(q.pws) { // personal weather station
		return cbk(null, ['pws:'+ q.pws]);
	}
	// No hit
	return cbk(new Error('Unable to build query from input.'));
}

Client.prototype._buildApiUri = function(action, pieces) {
	return (this.uri.protocol + this.uri.base + this.key + '/' + action + this.uri.separator + pieces.join('/') + this.uri.format);
}