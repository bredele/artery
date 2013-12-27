var assert = require('assert'),
    artery = require('artery');

describe("hooks", function() {

	var app = null,
	    hub = null;

	beforeEach(function(){
		app = artery();
		hub = artery();
	});

	describe("init and .use(app)", function() {

		it("should emit an init event in sandbox", function() {
			var called = false;
			//TODO: should we merge app.on and app.sandbox.on?
			app.sandbox.on('init', function(){
				called = true;
			});
			hub.use('app', app);
			assert.equal(called, true);		
		});

		it('should emit an init event in hub app', function() {
			var called = false;
			hub.sandbox.on('init app', function() {
				called = true;
			});
			hub.use('app', app);
			assert.equal(called, true);
		});
	
	});

	describe("app stop", function() {
		
	});

	describe("destroy", function() {
		
	});
});
