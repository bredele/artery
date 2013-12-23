var assert = require('assert'),
    carry = require('carry');

describe("config", function() {
	var app = null;

	beforeEach(function(){
		app = carry();
	});

	it("shoud set config object", function() {
		app.config({
	  	domain: 'github',
	  	async: false
	  });
	  assert.equal(app.config('domain'), 'github');
	  assert.equal(app.config('async'), false);
	});

	it("should set config property", function() {
		app.config({
	  	domain: 'github',
	  	async: false
	  });
		app.config('async', true);
	  assert.equal(app.config('domain'), 'github');
	  assert.equal(app.config('async'), true);
	});

	it('should return app config', function() {
		var config = {
	  	domain: 'github',
	  	async: false
	  };
		assert.deepEqual(app.config(), {});
		app.config(config);
		assert.equal(app.config(), config);
	});
	
});
