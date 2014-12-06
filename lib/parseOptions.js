/*
 * Grunt config and CLI option parser for Closure Compiler definitions
 *
 * Copyright (c) 2014 Startup Kitchen
 * Licensed under the Apache-2.0 license.
 */

'use strict';

/**
 * Merges given parameters as key=pair. Latter overrides.
 * @param {Object|Array|string...} var_args
 * @return {Array.<string>} Merged key=pair define strings.
 */
module.exports = function parseOptions(var_args) {
    var _ = require('lodash');
    var args = Array.prototype.slice.call(arguments);

    function parseCommaSeparatedDefs(defs) {
        return parseArrayDefs(defs.split(','));
    }

    function parseArrayDefs(defs) {
        var rv = {};
        defs.forEach(function(def) {
            var pair = def.split('=');
            rv[pair[0]] = (typeof pair[1] === 'undefined') ? true : pair[1];
        });
        return rv;
    }

    args.map(function(arg) {
        if (typeof arg === 'string') {
            arg = parseCommaSeparatedDefs(arg);
        } else if (Array.isArray(arg)) {
            arg = parseArrayDefs(arg);
        } else if (typeof arg !== 'object') {
            arg = {};
        }
        return arg;
    });
    args.unshift({});
    var compDefs = _.merge.apply(_, args);

    return Object.keys(compDefs).map(function(key) {
        var value = compDefs[key];

        switch (typeof value) {
            case 'string':
                value = '"' + value.replace(/"/g, '\"') + '"';
                break;
            default:
                value = String(value);
        }

        return '\'' + key + '=' + value + '\'';
    });
};
