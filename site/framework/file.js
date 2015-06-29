
;

var fs = require('fs');
var path = require('path');
var cs = require('./cornerstone.core.js');

cs.file = {
    loadConfig: function(name) {
        var configPath = path.resolve(__dirname, "..", "config", name);

        if (fs.existsSync(configPath)) {
            var extension = path.extname(configPath);
            if (extension === '.json') {
                var contents = fs.readFileSync(configPath, { encoding: 'utf-8'});
                return JSON.parse(contents);
            } else if (extension === '.js') {
                return require(configPath);
            }
        }

        return null;
    },

    files: function(directory) {
        var files = fs.readdirSync(directory)
                            .filter(function(file) {
                                return !fs.statSync(path.resolve(directory, file)).isDirectory();
                            });

        return files;
    },

    directories: function(directory) {
        var directories = fs.readdirSync(directory)
                            .filter(function(file) {
                                return fs.statSync(path.resolve(directory, file)).isDirectory();
                            });
        return directories;
    },

    loadFile: function(path) {
        return fs.readFileSync(path, { encoding: 'utf-8'});
    }

};

module.exports = cs.file;