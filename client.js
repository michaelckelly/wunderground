var request = require('request');

var Client = function(api_key) {
	this.key = api_key;

	this.base_uri = 'http://api.wunderground.com/api/';

	this.actions = ['forecast', 'conditions']

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
				var api_request = self.base_uri + self.key + '/'+ action +'/q/'+ pieces.join('/') + '.json';
				request({ uri : api_request, json : true }, function(err, body, res) {
					if(!err) {
						return cbk(null, res);
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
}

module.exports = Client;