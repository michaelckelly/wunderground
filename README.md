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
	state : 'CA' // two-letter state code
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

Advanced Usage
==============
You can also acess the `wunderground.execute` method directly--the main advantage of this is you can specify multiple data sources to receive in a single request.

For example:
```javascript
var query = {
	zip : '20854'
};
var actions = ['forecast, 'forecast10day', 'conditions'];
wunderground.execute(actions, query, function(err, result) {
	// Result has the current forecase, the 10 day forecast, and current conditions
});
```

Localization
============
The Wunderground API provides results in a large range of languages.  You can specify the language for API requests on initlaization.  Example:
```javascript
var wunderground = require('node-wunderground')('my-api-key', 'FR');
```
All requests will be returned in French.  All languages are specified with a two letter, capitalized string.  See the [official documentation](http://www.wunderground.com/weather/api/d/docs?d=language-support) for the full list.

License & Disclaimer
====================
