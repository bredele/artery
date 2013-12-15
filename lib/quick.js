
/**
 * Modules dependencies. 
 */

var App = require('./application'),
    mixin = require('mixin'); //create utils if more


var cache = {};


/**
 * Expose quick()
 */

exports = module.exports = quick;


/**
 * Create a quick application.
 *
 * @return {Object}
 * @api public
 */

function quick() {
	//return a new app
	return mixin(cache, new App());
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
	cache = obj;
};