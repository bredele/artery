
/**
 * Module dependencies
 */

var Emitter = require('emitter');


//global carry emitter

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
	emitter.on.apply(this, arguments);
};


App.prototype.emit = function(name) {
	var args = [this.name + '/' + name].concat([].slice.call(arguments, 1));
	emitter.emit.apply(this, args);
};


App.prototype.once = function() {
	emitter.once.apply(this, arguments);
};


App.prototype.off = function() {
	emitter.off.apply(this, arguments);
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