/**
 * module dependencies
 */

var app = module.exports = require('artery')();

//middleware

app.use(require('./mails'));//the function should have an init attr?
