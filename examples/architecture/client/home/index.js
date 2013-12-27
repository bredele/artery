
/**
 * Module dependencies.
 */

var app = require('artery')();


// middlewares


app.use('mails', require('mails'));
app.use('draft', require('draft'));
app.use('trash', require('trash'));

//app.stop('mails')
//app.stop('mail', true)
//app.stop()

//app.start??