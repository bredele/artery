
/**
 * Application prototype
 */

module.exports = App;



function App() {

}


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