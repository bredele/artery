/**
 * module dependencies
 */

var app = module.exports = require('carry')();

//middleware

app.use(require('./mails'));//the function should have an init attr?
