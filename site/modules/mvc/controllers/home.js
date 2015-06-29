
;

var Controller = require('../controller.js');

var controller = new Controller("home");

// TODO(jwwishart) prefix route with controller name
// TODO(jwwishart) arguments to the method...
//   should be 2nd and 3rd argument OR a field on the 
//   context passed in
//   function() {
//      this.request;    
//      this.response;
//   }

controller.get('/', function(req, resp) {
    return this.view("home.html");
});

controller.get('/another', function(req, resp) {
    return this.view("another.html");
});

controller.get('/1', function(req, resp) {
    return this.stringResponse("this is a test: 1");
});

controller.get('/2', function(req, resp) {
    return this.jsonResponse({ foo: 'bar' });
});

controller.get('/3', function(req, resp) {
    this.response.json({
        uri: '/custom-handle-response',
        handledTheResponseByItself: true
    });
});

module.exports = controller;

