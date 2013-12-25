var app = require('carry')();


// middleware

app.use('trash', require('trash'));
app.use('mails', require('mails'));
app.use('draft', require('draft'));