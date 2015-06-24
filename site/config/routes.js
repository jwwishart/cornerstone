
'use strict';

exports.register = function(app) {
    app.get('/api/:area/:method', function(req, res) {
        res.json({
            area: req.params.area,
            method: req.params.method
        });
    });



    app.get('/', function(req, res) {
        res.send('hello world <script src="/js/test.js"></script>');
    });
};