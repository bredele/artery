var assert = require('assert'),
    artery = require('..').merge({
			path: function(){}
		}, {
			get: function(){}
		});

describe("merge", function() {
	var app = null;
	beforeEach(function(){
		app = artery();
	});

	it("shoud merge an object with artery apps", function() {
		assert.equal(typeof app.path,'function');
	});

	it("should merge multiple objects", function() {
		assert.equal(typeof app.path, 'function');
		assert.equal(typeof app.get,'function');
	});
	
});
