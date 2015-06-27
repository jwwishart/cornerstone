
var moduleLoader = require('../../../loader.js');

exports.call = function(req, res) {
    var modules = moduleLoader.getModuleInfo();

console.log(modules);

    res.json(modules);
};
