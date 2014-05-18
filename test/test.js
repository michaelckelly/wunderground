/**
 * node-wunderground tests
 * mocha test
 */
var assert = require('assert')
  , should = require('should')
  , Client = require('../client');

describe('Client', function() {
	describe('#constructor', function() {
		it('should throw an error with no key or an empty key', function() {
			Client.bind(null).should.throw();
			Client.bind('').should.throw();
		});
		it('should be an instance of Client', function() {
			var c = new Client('fake-key');
			c.should.be.an.instanceof(Client);
		});
	});

	describe('#requests', function() {
		var c = new Client('5359fc99b34815ef');
		it('should throw an error for an invalid request', function() {
			var badReq = { fake_tag : 'fake_value' };
			c.forecast(badReq, function(err, res) {
				should.exist(err);
				should.not.exist(res);
			});
		});
		it('should not throw an error for a valid request', function() {
			var validReq = { city : 'San Francisco', state : 'CA' };
			c.forecast(validReq, function(err, res) {
				should.not.exist(err);
				should.exist(req);
			})
		})
	})
});