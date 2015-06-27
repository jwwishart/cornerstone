'use strict';


exports.register = function (config, express, app) {
    app.use('/js', express.static('js'));
    app.use('/css', express.static('css'));
};
