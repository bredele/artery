
/**
 * Application prototype
 */

var app = exports = module.exports = {};


/**
 * Initialize application.
 * 
 * @api private
 */

app.init = function() {
	this.name = '';
};


/**
 * Proxy to intialize other quick apps.
 *
 * @param {String} name
 * @param {Function|App} fn 
 * @return {app} for chaning api
 * @api public
 */

app.use = function(name, fn) {

};


app.config = function() {

};


app.debug = function() {

};