
/**
 * Module dependencies
 */

var Emitter = require('emitter');


/**
 * Application prototype
 */

module.exports = App;



function App() {
	this.name = "";
}


Emitter(App.prototype);


/**
 * Proxy to intialize other quick apps.
 *
 * @param {String} name
 * @param {Function|App} fn 
 * @return {app} for chaning api
 * @api public
 */

App.prototype.use = function(name, fn) {

};


App.prototype.config = function() {

};


App.prototype.debug = function() {

};