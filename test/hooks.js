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
		var called = false;
		app.sandbox.on('init', function(){
			called = true;
		});
		assert.equal(called, false);
		hub.use('app', app);
		qssert.equal(called, true);
	});
	describe("stop", function() {
		
	});
	describe("destroy", function() {
		
	});
});
