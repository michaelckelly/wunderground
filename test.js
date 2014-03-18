var wunderground = require('./')('5359fc99b34815ef');

var q = {
	zip           : '20854'
};

var action = ['conditions'];

wunderground.execute(action, q, function(err, res) {
	if(err) {
		console.log('errd');
	} else console.log(res);
});