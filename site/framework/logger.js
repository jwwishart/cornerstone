
;

var cs = require('./cornerstone.core.js');

cs.logger = {
    error: function(error) {
        console.error(error);
    },

    log: function(message) {
        console.log(message);
    }
};

module.exports = cs.logger;