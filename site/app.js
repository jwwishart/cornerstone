var express = require('express');
var routes = require('./config/routes');
var app = express();
var moduleLoader = require('./modules/loader.js');

moduleLoader.load(express, app);


// Middleware -----------------------------------------------------------------
// 

app.use(function(err, req, res, next) {

});


// Error Handling
// TODO(jwwishart) write error handlers (last piece of middleware?)
app.use(function(err, req, res, next) {
    res.status(500).send('There was an exception while handling your request');
    res.render('error', {error: err});
});




// Gentlemen, Start your engines!
//

// TODO(jwwishart) port should be an environment variable?
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    // TEST ERROR FUNCTIONALITY
    // throw new Error('test');

    console.log('Hello World application listening at http://%s:%s', host, port);
});
