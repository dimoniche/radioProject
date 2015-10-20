var config = require("nconf");
var express = require('express');
var http = require('http');
var app = express();

//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/radio');

config.argv()
    .env()
    .file({ file: 'config.json' });

// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

//boot
require('./boot/index')(app);

// routing
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    if ('development' == app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});
