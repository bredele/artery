
/**
 * Module dependencies
 */

var array = require('toarray'),
    Emitter = require('emitter');


//global carry emitter

var emitter = new Emitter();


/**
 * Expose 'App'
 */

module.exports = App;


/**
 * Application prototype
 */

function App(name) {
	//TODO: see if we should pass constructor parameters
	this.name = name || "";
	this.settings = {};
}


/**
 * Listen events on communication bus.
 *
 * Example:
 *
 *     app.on('auth/login', fn);
 *
 * @param {String} name
 * @param {Function} fn 
 * @return {app} 
 */

App.prototype.on = function(){
	return emitter.on.apply(emitter, arguments);
};


/**
 * Emit event on communication bus.
 * 
 * Example:
 *
 *     app.emit('login', true);
 *
 * @param {String} name
 * @return {app}
 */

App.prototype.emit = function(name) {
	var args = [this.name + '/' + name].concat(array(arguments, 1));
	return emitter.emit.apply(emitter, args);
};


/**
 * Listen events once on communication bus.
 *
 * @param {String} name
 * @param {Function} fn 
 * @return {app} 
 */

App.prototype.once = function() {
	return emitter.once.apply(emitter, arguments);
};


/**
 * Remove event listener on communication bus.
 *
 * Example:
 *
 *     app.off('auth/login', fn);
 *
 * @param {String} name
 * @param {Function} fn 
 * @return {app} 
 */

App.prototype.off = function() {
	return emitter.off.apply(emitter, arguments);
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
	//function middleware
	if(typeof name === 'function') {
		name.call(null, this);
	}
	
	//carry app
	if(fn && fn.use) { //what defined an app?
		fn.name = name;
	}
};


/**
 * Configuration handler (setter/getter).
 *
 * Example:
 *
 *     app.config(); //return settings
 *     app.config({type:'app'}); //set config
 *     app.conffig('type', 'worker'); //set config prop
 *     app.config('type'); //get config prop
 *     
 * @api public
 */

App.prototype.config = function(key, value) {
	//we could save the config in localstore
	if(!key) return this.settings;
	if(typeof key === 'object') {
		this.settings = key;
		return;
	}
	if(!value) return this.settings[key];
	this.settings[key] = value;
};


// App.prototype.worker = function() {
// 	//initialize an app inside a web worker
// };


App.prototype.debug = function() {
	//common debug bus
};