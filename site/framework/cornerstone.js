
// NOTE: require all libraries we want to add... they should extend cs
// generally speaking...
require('./logger.js');
require('./file.js');


// Then we export the core which should have all the bits and pieces on it.
module.exports = require('./cornerstone.core.js');
