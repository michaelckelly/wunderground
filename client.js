var request = require('request');

/**
 * Client
 */
var Client = function(api_key) {
	if(!api_key || api_key == '') {
		throw new Error('No Wunderground API key provided.');
	}

	this.key = api_key;
	this.actions = ['forecast', 'conditions', 'forecast10day', 'hourly', 'hourly10day']
	this.uri = {
		protocol  : 'http://',
		base      : 'api.wunderground.com/api/',
		separator : '/q/',
		format    : '.json'
	};

	for(i = 0; i < this.actions.length; i++) {
		var action = this.actions[i];
		this[this.actions[i]] = function() {
			var args = [action];
			for(var arg in arguments) {
				args.push(arguments[arg]);
			}
			(this.execute).apply(this, args);
		}
	}
	/**
	 * Generic function to execute a wunderground API call
	 * @param type
	 */
	this.execute = function(action, q, cbk) {
		var self = this;
		this._buildQuery(q, function(err, pieces) {
			if(err) {

			} else {
				var api_request = self._buildApiUri(action, pieces);
				request({ uri : api_request, json : true }, function(err, body, res) {
					if(!err) {
						return cbk(null, res);
					} else {
						// process error?
					}
				});
			}
		});
	}

	/**
	 * Build a valid query out of our query wrapper
	 */
	this._buildQuery = function(q, cbk) {
		if(q.international) {
			// it's international
		} else {
			// go case by case
			if(q.city && q.state) {
				return cbk(null, [q.state, q.city]);
			} else if(q.zip) {
				return cbk(null, [q.zip]);
			}
		}
		// No hit
		return cbk(new Error('Unable to build query from input.'));
	}

	this._buildApiUri = function(action, pieces) {
		return (this.uri.protocol + this.uri.base + this.key + '/' + action + this.uri.separator + pieces.join('/') + this.uri.format);
	}
}

module.exports = Client;