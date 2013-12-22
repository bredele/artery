var assert = require('assert'),
    carry = require('carry').merge({
			path: function(){}
		}, {
			get: function(){}
		});

describe("merge", function() {
	var app = null;
	beforeEach(function(){
		app = carry();
	});

	it("shoud merge an object with carry apps", function() {
		assert.equal(typeof app.path,'function');
	});

	it("should merge multiple objects", function() {
		assert.equal(typeof app.path, 'function');
		assert.equal(typeof app.get,'function');
	});
	
});
