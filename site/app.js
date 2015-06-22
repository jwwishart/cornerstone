var express = require('express');
var app = express();

// Static File Registration
//

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));


// Routes ---------------------------------------------------------------------
//

// API

app.get('/api/:area/:method', function(req, res) {
    res.json({
        area: req.params.area,
        method: req.params.method
    });
});



app.get('/', function(req, res) {
    res.send('hello world <script src="/js/test.js"></script>');
});


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
