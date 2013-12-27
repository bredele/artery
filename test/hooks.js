var assert = require('assert'),
    artery = require('artery');

describe("Hooks", function() {

	var app = null,
	    hub = null;

	beforeEach(function(){
		app = artery();
		hub = artery();
	});

	describe("init", function() {

		it("should have an init hook", function() {
			var called = false;
			//TODO: should we merge app.on and app.sandbox.on?
			app.sandbox.on('init', function(){
				called = true;
			});
			assert.equal(called, false);
			hub.use('app', app);
			assert.equal(called, true);		
		});
	
	});

	describe("stop", function() {
		
	});

	describe("destroy", function() {
		
	});
});
