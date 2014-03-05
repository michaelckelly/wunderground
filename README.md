wunderground
============

A simple wrapper around the [Wunderground API](http://www.wunderground.com/weather/api) for Node.

Installation
============
Installation is quick and easy via NPM:
```
npm install wunderground
```

Why?
====
Becuase spending more than a few minutes getting this API up-and-running is better spent making your app awesome.

There are a few other modules out there that integrate the Wunderground API but I wasn't quite satisifed with them. 

Usage
=====
The module is designed to be simple and easy to use and follows Wunderground's API verbiage almost exclusively.

```javascript
var wunderground = require('node-wunderground')('my-api-key');

var query = {
	city  : 'San Francisco',
	state : 'California'
};

wunderground.forecast10day(query, function(err, forecast) {
	// do fun stuff here!
});
```

The module accepts a variety of parameters in the query object:
* city
* state
* zip
* airport code
* PWS code
* country
* latitude
* longitude
