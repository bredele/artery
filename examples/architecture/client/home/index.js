var app = require('carry')();


// middleware


app.use('mails', require('mails'));
app.use('draft', require('draft'));
app.use('trash', require('trash'));