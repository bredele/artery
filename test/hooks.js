var assert = require('assert'),
    artery = require('..');

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

		describe("init handler", function() {
			it('should define init callback', function() {
				var called = false;
				app.init(function() {
					called = true;
				});
				hub.use('app', app);
				assert.equal(called, true);
			});

			it('should emit an init event', function() {
				var called = false;
				app.init(function() {
					called = true;
				});
				app.init();
				assert.equal(called, true);
			});
		});
	
	});

	describe("app stop", function() {
		it("should emit a stop event");
		
	});

	describe("destroy", function() {
	  it("should emit a destroy event");
	});
});
