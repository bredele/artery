
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
	this.settings = {};
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
	//an app should have a name though
	if(!key) return this.settings;
	if(typeof key === 'object') {
		this.settings = key;
		return;
	}
	if(!value) return this.settings[key];
	this.settings[key] = value;
};


App.prototype.worker = function() {
	//initialize an app inside a web worker
};


App.prototype.debug = function() {
	//common debug bus
};