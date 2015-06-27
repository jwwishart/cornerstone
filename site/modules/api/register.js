
;

var fs = require('fs');
var path = require('path');


exports.register = function (config, express, app) {

    app.get('/api/:area/:method', function(req, res) {
        var area = req.params.area;
        var method = req.params.method;

        // TODO(jwwishart): ensure the parts dont have:
        // - .
        // - /
        // - anything else dodgy... should only be - 0-9 and a-Z
        var path = __dirname + '/services' + '/' + area + '/' + method + '.js';

        if (fs.existsSync(path)) {
            require(path).call(req, res);
            return;
        }

        res.status(404).json({
            error: 'Web Service Not Found - Area: ' + area + ', Method: ' + method
        });
    });

};