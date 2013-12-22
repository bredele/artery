
/**
 * Modules dependencies. 
 */

var App = require('./application'),
    mixin = require('mixin'); //create utils if more


var cache = {};


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
	//return a new app
	return mixin(new App(), cache);
}


/**
 * Merge every application with passed object.
 * It can be really useful to extend the api (ex:superagent)
 * 
 * @param  {Object} obj 
 * @api public
 */

exports.merge = function(obj) {
	//TODO: array of cache to merge multiple objects
	//TIPS: could have multiple arguments
	cache = obj;
};