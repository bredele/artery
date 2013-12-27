;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("bredele-mixin/index.js", function(exports, require, module){

/**
 * Expose 'mixin'
 */

module.exports = mixin;


/**
 * mixin constructor.
 * @api public
 */

function mixin(to, from) {
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = from[key];
    }
  }

  return to;
}


});
require.register("bredele-toarray/index.js", function(exports, require, module){
/**
 * Expose `toArray`.
 */

module.exports = toArray;

/**
 * toArray
 *
 * @param {Object}  obj Array-like or string
 * @param {Number}  index slice index
 * @return {Array} Empty Array if argument other than string or Object
 * @api public
 */

function toArray(obj, index) {
  return [].slice.call(obj, index);
}

});
require.register("component-emitter/index.js", function(exports, require, module){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
require.register("artery/lib/index.js", function(exports, require, module){

/**
 * Modules dependencies. 
 */

var App = require('./application'),
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
});
require.register("artery/lib/application.js", function(exports, require, module){

/**
 * Module dependencies
 */

var array = require('toarray'),
    Emitter = require('emitter');


//global artery emitter

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
	
	//artery app
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
});



require.alias("bredele-mixin/index.js", "artery/deps/mixin/index.js");
require.alias("bredele-mixin/index.js", "artery/deps/mixin/index.js");
require.alias("bredele-mixin/index.js", "mixin/index.js");
require.alias("bredele-mixin/index.js", "bredele-mixin/index.js");
require.alias("bredele-toarray/index.js", "artery/deps/toarray/index.js");
require.alias("bredele-toarray/index.js", "artery/deps/toarray/index.js");
require.alias("bredele-toarray/index.js", "toarray/index.js");
require.alias("bredele-toarray/index.js", "bredele-toarray/index.js");
require.alias("component-emitter/index.js", "artery/deps/emitter/index.js");
require.alias("component-emitter/index.js", "emitter/index.js");

require.alias("artery/lib/index.js", "artery/index.js");if (typeof exports == "object") {
  module.exports = require("artery");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("artery"); });
} else {
  this["artery"] = require("artery");
}})();