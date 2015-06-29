;

(function(root) {
    'use strict';

    // Cache Variables
    //

    var toString = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    
    // Constants
    //

    var ARRAY_TYPE_STRING = '[object Array]';


    // CS
    //

    var cs = {};
    cs.VERSION = '0.0.1';


    // Module Registration
    //

    if (typeof define === 'function' && define.amd) {
        define(['cs'], function(cs) {
            return cs;
        });
    } else if (typeof exports === 'object') {
        module.exports = cs;
    } else {
        root.cs = cs;
    }


    // Helpers
    //

    cs.hasValue = function(it) {
        // NOTE(jwwishart) if undefined is redefined a 
        return it !== null && it !== void 0;
    };


    // Type Checking
    //


    // TODO(jwwishart) check that this works with [] and new Array()... ?
    // KUDOS: is.js
    cs.isArray = Array.isArray || function(it) {
        return toString.call(it) === ARRAY_TYPE_STRING;
    };

    // KUDOS: is.js
    cs.isObject = function(it) {
        var type = typeof it;
        return type === 'function' || type === 'object' && !!it; // TODO(jwwishart) is.js... why last condition?
    };


    // Collections
    //

    cs.each = function(it, callback) {
        var result,
            i,
            key;

        if (!this.hasValue(it)) {
            return;
        }
        
        // TODO(jwwishart) test callback is a function!
        if (!callback || typeof callback !== 'function') {
            throw new Error('callback is not valid');
        }

        if (this.isArray(it)) {
            for (i = 0; i < it.length; i++) {
                // TODO(jwwishart) normalize undefined and nulls?
                result = callback.call(it, it[i], i);

                if (!this.hasValue(result) || result === true) {
                    continue;
                }

                break;
            }

            return;
        }

        if (this.isObject(it)) {
            for (key in it) {
                if (Object.prototype.hasOwnProperty.call(it, key)) {
                    // TODO(jwwishart) normalize undefined and nulls?
                    result = callback.call(it, it[key], key);

                    if (!this.hasValue(result) || result === true) {
                        continue;
                    }

                    break;
                }
            }
        }
    };

}(this));