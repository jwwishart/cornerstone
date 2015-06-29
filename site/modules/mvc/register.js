'use strict';


var fs = require('fs');
var path = require('path');
var cs = require('../../framework/cornerstone.js');


exports.register = function (config, express, app) {
    // Get list of all controllers
    var controllersDir = path.resolve(__dirname, 'controllers');
    var files = cs.file.files(controllersDir);

    // Register all routes from _routeRegistration field.
    cs.each(files, function(filename) {
        var file = path.resolve(controllersDir, filename);
        var controller = require(file);

        cs.each(controller._routeRegistrations, function(entry) {
            if (entry.method === 'GET') {
                app.get(entry.route, entry.handler);
                return;
            }

            if (entry.method === 'POST') {
                app.get(entry.route, entry.handler);
                return;
            }

            // TODO(jwwishart) other methods
        });
    });
};
