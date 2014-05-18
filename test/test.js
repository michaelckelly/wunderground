/**
 * node-wunderground tests
 * mocha test
 */
var assert = require('assert')
  , should = require('should')
  , Client = require('../client')
  , testKey = 'YOUR API KEY HERE';

describe('Client', function() {
	describe('#constructor', function() {
		it('should throw an error with no key or an empty key', function() {
			Client.bind(null).should.throw(); // no key
			Client.bind('').should.throw(); // null key
		});
		it('should be an instance of Client', function() {
			var c = new Client('fake-key');
			c.should.be.an.instanceof(Client);
		});
	});

	describe('#requests', function() {
		var c = new Client(testKey);

		it('should return an error for an invalid request', function() {
			var badReq = { fake_tag : 'fake_value' };
			c.forecast(badReq, function(err, res) {
				should.exist(err);
				should.not.exist(res);
			});
		});
		it('should not return an error for a valid request', function() {
			var validReq = { city : 'San Francisco', state : 'CA' };
			c.forecast(validReq, function(err, res) {
				should.not.exist(err);
				should.exist(req);
			})
		});
	});

	describe('#_buildQuery', function() {
		var c = new Client(testKey);
		it('should return an error for an invalid request', function() {
			var badReq = { fake_key : 'fake_value' };
			c.forecast(badReq, function(err, res) {
				should.exist(err);
				should.not.exist(res);
			});
		});

		// TODO: Test every possible input option for correctness
		it('should return a valid query', function() {
			var query = { city : 'San Francisco', state : 'CA' };
			var action = 'forecast';

			c._buildQuery(query, action, function(err, parsed_action, params) {
				should.not.exist(err);
				parsed_action.should.eql(action);
				params.should.eql(['CA', 'San Francisco']);
			})
		});

	})
});