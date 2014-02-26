var wunderground = require('./')('5359fc99b34815ef');

var q = {
	international : false,
	city          : 'Durham',
	state         : 'NC'
};

wunderground.forecast(q, function(err, res) {
	console.log(res);
});