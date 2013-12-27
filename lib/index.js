
/**
 * Modules dependencies. 
 */

var App = require('./app'),
    array = require('toarray'),
    mixin = require('mixin'); //create utils if more


var cache = [];


/**
 * Expose artery()
 */

module.exports = artery;


/**
 * Create a artery application.
 *
 * @return {Object}
 * @api public
 */

function artery() {
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

artery.merge = function() {
	cache = array(arguments);
	return this;
};