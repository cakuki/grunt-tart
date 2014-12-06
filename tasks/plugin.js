/*
 * grunt-tart:plugin task
 * https://github.com/cakuki/grunt-tart
 *
 * Copyright (c) 2014 Startup Kitchen
 * Licensed under the Apache-2.0 license.
 */

'use strict';

var _ = require('lodash');

module.exports = function tart_plugin(grunt) {

    grunt.loadNpmTasks('grunt-cordovacli');

    grunt.registerTask('plugin', 'tartJS + Cordova plugin management task.', function(action, id, version) {
        console.log(action, id, version);
    });
};
