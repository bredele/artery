

module.exports = function(app) {

	document.querySelector('.delete').addEventListener('click',function(){
		app.emit('delete');
	});

	document.querySelector('.save').addEventListener('click',function(){
		app.emit('save');
	});

	app.on('mails/delete', function() {
		console.log('mails emitted delete');
	});

};
