var assert = require('assert'),
    carry = require('carry');

describe("Communication bus", function() {
	var app = null;

	beforeEach(function(){
		app = carry();
	});
	
	it("should prefix events with app's name", function() {
		var r = false;
		app.name = 'bredele';
		app.on('bredele/test', function(val){
			r = val;
		});
		app.emit('test', true);
		assert.equal(r, true);
	});

	it("should remove event listener", function() {
		var idx = 0,
		fn = function(){
			idx++;
		};
		app.name = 'bredele';
		app.on('bredele/test', fn);
		app.emit('test');
		app.off('bredele/test', fn);
		app.emit('test');
		assert.equal(idx, 1);
	});

	it("should emit event once", function() {
		var idx = 0;
		app.name = 'bredele';
		app.once('bredele/test', function(){
			idx++;
		});
		app.emit('test');
		app.emit('test');
		assert.equal(idx, 1);
	});
	
});
