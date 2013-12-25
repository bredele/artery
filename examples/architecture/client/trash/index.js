
var app = module.exports = require('carry')();

	app.on('mails/delete', function() {
		console.log('trash');
	});
