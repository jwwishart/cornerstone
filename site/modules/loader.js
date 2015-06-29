
(function() {
    'use strict';

    var fs = require('fs');
    var path = require('path');
    var cs = require('../framework/cornerstone.js');


    /*
        Each module needs to be in a separate folder
        in the modules folder and the names must be 
        unique.

        Each folder needs:
        - config.json
            {
                id: '686f9cd6-8d3f-4157-9386-1cdc0f12778d',
                name: 'API Module',
                version: 1,

                // NOTE: anything else can be added if desired
            }

        - registration.js
            This file should export a register() function
            which takes the express app and registers
            whatever it needs to register
        
     */




    exports.load = function(express, app) {
        var info = this.getModuleInfo();

        cs.each(info, function(module) {
            cs.logger.log('MODULE: ' + module.name);

            var registerPath = path.resolve(__dirname, module._directory, 'register.js');

            if (fs.existsSync(registerPath)) {
                var register = require(registerPath);
                register.register(module, express, app);
            }
        });
    };

    exports.getModuleInfo = function() {
        var loadedModules = [];
        var results = [];

        // Get the directories in the current directory
        var directories = cs.file.directories(__dirname);

        // NOTE(jwwishart) the following file specifies WHICH modules to load and...
        // in what order
        var ordering = cs.file.loadConfig("modules.js");
        
        cs.each(directories, function(dir, i) {
            var configPath = path.resolve(__dirname, dir, 'config.json');

            if (fs.existsSync(configPath)) {
                var contents = fs.readFileSync(configPath, { encoding: 'utf-8' });
                var obj = JSON.parse(contents);
                obj._directory = dir;
                loadedModules.push(obj);
            }
        });

        // Order the module load order... exclude ones that should not be loaded therefore
        cs.each(ordering, function(name) {
            cs.each(loadedModules, function(module) {
                if (module._directory === name) {
                    results.push(module);
                }
            });
        });

        return results;
    };

}());
