var assert = require('assert'),
    artery = require('artery');

describe("config", function() {
	var app = null;

	beforeEach(function(){
		app = artery();
	});

	it("shoud set config object: .config(obj)", function() {
		app.config({
	  	domain: 'github',
	  	async: false
	  });
	  assert.equal(app.config('domain'), 'github');
	  assert.equal(app.config('async'), false);
	});

	it("should set config property: .config(key,value)", function() {
		app.config({
	  	domain: 'github',
	  	async: false
	  });
		app.config('async', true);
	  assert.equal(app.config('domain'), 'github');
	  assert.equal(app.config('async'), true);
	});

	it('should return app config: .config()', function() {
		var config = {
	  	domain: 'github',
	  	async: false
	  };
		assert.deepEqual(app.config(), {});
		app.config(config);
		assert.equal(app.config(), config);
	});

	describe("Config emitter", function() {
		
		it("should listen changes in config prop", function() {
			var val = false;
			//to refactor with app.on
			app.sandbox.on('change type', function() {
				val = true;
			});
			app.config('type', 'worker');
			assert.equal(val, true);
		});

		it("should listen reset in config", function() {
			var added = false,
			    deleted = false;
			app.config({
				type:'worker'
			});

			//to refactor with app.on
			app.sandbox.on('change environment', function() {
				added = true;
			});

			//to refactor with app.on
			app.sandbox.on('deleted type', function() {
				deleted = true;
			});

			app.config({
				environment : 'prod'
			});
			assert.equal(added, true);
			assert.equal(deleted, true);
		});
		
		
	});
	
	
});
