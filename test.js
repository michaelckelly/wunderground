var wunderground = require('./')('5359fc99b34815ef');

var q = {
	international : false,
	zip           : '20854'
};



// wunderground.conditions(q, function(err, res) {
// 	console.log(err||res);
// });

wunderground.currenthurricane({}, function(err, res) {
	console.log(err||res);
})