var assert = require('assert'),
    carry = require('carry');

describe("Carry middleware", function() {
	var app = null,
	    child = null;

	beforeEach(function(){
		app = carry();
		child = carry();
	});

	it("should initialize an app by name", function() {
		app.use('mail', child);
		assert.equal(child.name, 'mail');
	});

	it("should initialize an app", function() {
		child.name = 'test';
		app.use(child);
		assert.equal(child.name, 'test');		
	});

	it("should pass app to function middleware", function() {
		var ref = null;
		app.use(function(param) {
			ref = param;
		});
		assert.equal(app, ref);
	});
	
	
	
});
