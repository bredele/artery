var assert = require('assert'),
    carry = require('carry');

describe("Communication bus", function() {
	var app = null;
	beforeEach(function(){
		app = carry();
	});
	
	it("should prefix events with app's name", function() {
		var call;
		app.name = 'bredele';
		app.on('bredele/test', function(val){
			call = val;
		});
		app.emit('test', true);
		assert.equal(call, true);
	});
	
});
