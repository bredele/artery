var list = document.querySelector('.list');

var app = module.exports = require('artery')();

	app.on('mails/delete', function() {
		var li = document.createElement('li');
		li.innerText = 'mail deleted';
		list.appendChild(li);
	});
