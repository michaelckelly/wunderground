var wunderground = require('./')('5359fc99b34815ef');

var q = {
	zip           : '94403'
};

var action = ['forecast10day'];

wunderground.execute(action, q, function(err, res) {
	if(err) {
		// process err
	} else {
		var forecasts = res.forecast.simpleforecast.forecastday;
		for(var i = 0; i < forecasts.length; i++) {
			var f = forecasts[i];
			console.log([f.date.month, f.date.day, f.date.year].join('/') + ' - High: '+ f.high.fahrenheit +', Low: '+ f.low.fahrenheit);
		}
	}
});