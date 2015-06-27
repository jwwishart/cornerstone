
;

var cs = require('./cornerstone.js');

cs.logger = {
    error: function(error) {
        console.error(error);
    },

    log: function(message) {
        console.log(message);
    }
};

module.exports = cs.logger;