'use strict';

var fs = require('fs');
var path = require('path');


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


exports.loadModules = function(app) {
    var info = this.getModuleInfo();

    for (var module of info) {

    }
};

exports.getModuleInfo = function() {
    var results = [];
    // Get the directories in the current directory
    var directories = fs.readdirSync(__dirname)
                        .filter(function(file) {
                            return fs.statSync(path.resolve(__dirname, file)).isDirectory();
                        });;

    for (var i = 0; i < directories.length; i++) {
        var dir = directories[i];
        var configPath = path.resolve(__dirname, dir, 'config.json');

        if (fs.existsSync(configPath)) {
            var contents = fs.readFileSync(configPath, { encoding: 'utf-8' });
            results.push(JSON.parse(contents));
        }
    }

    return results;
};

exports.dumpModulesInfo = function() {
    var info = this.getModuleInfo();
    
    if (info == null || info.length === 0) {
        console.info('Module Loader: No Modules Found in "modules" folder');
        return;
    }

    console.log('--- MODULES -----------------------------------');
    for (var i in info) {
        var module = info[i];
        console.log('name:    ' + module.name + '-------------------------');
        console.log('version: ' + module.version);
        console.log('id:      ' + module.id);
        console.log('');

        for (var key in module) {
            if (key === 'name' || key === 'version' || key === 'id') continue;

            console.log(key + ': ' + module[key]);
        }

        console.log('-----------------------------------------------');
    }

    if (info.length > 0) {
        console.log('-----------------------------------------------');
    }
};
