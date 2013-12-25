
var mails = require('./mails');

var app = module.exports = require('carry')();

// app.start(function() {

// });

mails(app);
console.log('mails');

