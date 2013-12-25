
var mails = require('./mails');

var app = module.exports = require('carry')();

//app.use(require('./mails')) //the function should have an init attr?

mails(app);
