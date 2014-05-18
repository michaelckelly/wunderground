wunderground
============
A simple wrapper around the [Wunderground API](http://www.wunderground.com/weather/api) for Node.

Installation
============
Installation is quick and easy via NPM:
```
npm install wunderground
```

You will also need a valid [Wunderground API key](http://www.wunderground.com/weather/api).

Why?
====
Becuase spending more than a few minutes getting this API up-and-running is better spent making your app awesome.

There are a few other modules out there that integrate the Wunderground API but I wasn't quite satisifed with them. 

Usage
=====
The module is designed to be simple and easy to use and follows Wunderground's API verbiage almost exclusively.  Please see the Wunderground documentation for a list of all available options.

```javascript
var wunderground = require('node-wunderground')('my-api-key');

var query = {
	city  : 'San Francisco',
	state : 'CA' // two-letter state code
};

// Print San Francisco's high and low temperatures for the next 10 days
wunderground.forecast10day(query, function(err, forecasts) {
	if(err) {
		// uh-oh!
	} else {
		var forecasts = res.forecast.simpleforecast.forecastday;
		for(var i = 0; i < forecasts.length; i++) {
			var f = forecasts[i];
			console.log([f.date.month, f.date.day, f.date.year].join('/') + ' - High: '+ f.high.fahrenheit +', Low: '+ f.low.fahrenheit);
		}
	}});

// OR:

wunderground.conditions(query, function(err, conditions) {
	// current conditions
	if(!err) {
		console.log('In Sanfrancisco, CA, it currently feels like '+ conditions.current_observation.temp_f);
	}
});
```


The module accepts a variety of parameters in the query object (formal paramater names included in parenthesis if different):
* zip
* city
* state
* airport code (airport)
* PWS code (pws)
* country
* latitude (lat)
* longitude (lng)

NOTE: Latitude and longitude BOTH required.  Providing only one is illegal.  

You can provide any number of parameters but there is a precedence and established patterns:
* city & state
* zip
* country & city
* lat & lng
* airport
* pws
* country

Advanced Usage
==============
You can also acess the `wunderground.execute` method directly--the main advantage of this is you can specify multiple data sources to receive in a single request.

For example:
```javascript
var query = {
	zip : '20854'
};
var actions = ['forecast', 'forecast10day', 'conditions'];
wunderground.execute(actions, query, function(err, result) {
	// Result has the current forecast, the 10 day forecast, and the current conditions for the US zip code 20854.
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
All usage of the Wunderground API is subjet to the API's terms of service, which can be found at: [http://www.wunderground.com/weather/api/d/terms.html](http://www.wunderground.com/weather/api/d/terms.html)
