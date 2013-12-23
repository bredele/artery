
/**
 * Modules dependencies. 
 */

var App = require('./application'),
    mixin = require('mixin'); //create utils if more


var cache = [];


/**
 * Expose carry()
 */

exports = module.exports = carry;


/**
 * Create a carry application.
 *
 * @return {Object}
 * @api public
 */

function carry() {
	var app = new App();
	for(var i = 0, l = cache.length; i < l; i++) {
		mixin(app, cache[i]);
	}
	return app;
}


/**
 * Merge every application with passed object.
 * It can be really useful to extend the api (ex:superagent)
 * 
 * @param  {Object} obj 
 * @api public
 */

exports.merge = function() {
	cache = [].slice.call(arguments); //use component to array
	return this;
};