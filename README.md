wunderground
============

A simple wrapper around the Wunderground API for Node

Why?
====
Becuase spending more than a few minutes getting this API up-and-running is better spent making your app awesome

Usage
=====
The module is designed to be simple and easy to use and follows Wunderground's API verbage almost exclusively.

```javascript
var wunderground = require('node-wunderground')('my-api-key');

var q = {
	city  : 'San Francisco',
	state : 'California'
};

wunderground.forecast10day(q, function(err, forecast) {
	// do fun stuff here!
});
```