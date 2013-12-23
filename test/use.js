var assert = require('assert'),
    carry = require('carry');

describe("Carry middleware", function() {
	var app = null,
	    child = null;

	beforeEach(function(){
		app = carry();
		child = carry();
	});

	it('should initiaze an app by name', function() {
		app.use('mail', child);
		assert.equal(child.name, 'mail');
	});

	
});
