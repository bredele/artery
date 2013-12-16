
/**
 * Module dependencies
 */

var Emitter = require('emitter');


//global quick emitter

var emitter = new Emitter();


/**
 * Expose 'App'
 */

module.exports = App;


/**
 * Application prototype
 */

function App() {
	this.name = "";
}


App.prototype.on = function(){
	emitter.on.apply(null, arguments);
};


App.prototype.emit = function() {
	emitter.emit.apply(null, arguments);
};


App.prototype.once = function() {
	emitter.once.apply(null, arguments);
};


/**
 * Proxy to intialize other quick apps.
 *
 * @param {String} name
 * @param {Function|App} fn 
 * @return {app} for chaning api
 * @api public
 */

App.prototype.use = function(name, fn) {
	//initialize an app with a name (name in communication bus)
};


App.prototype.config = function() {
	//we could save the config in localstore
	//an app should have a name though
};


App.prototype.worker = function() {
	//initialize an app inside a web worker
};


App.prototype.debug = function() {
	//common debug bus
};