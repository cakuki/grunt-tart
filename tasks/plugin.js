/*
 * grunt-tart:plugin task
 * https://github.com/cakuki/grunt-tart
 *
 * Copyright (c) 2014 Startup Kitchen
 * Licensed under the Apache-2.0 license.
 */

'use strict';

module.exports = function tart_plugin(grunt) {

    grunt.loadNpmTasks('grunt-cordovacli');

    grunt.registerTask('plugin', 'tartJS + Cordova plugin management task.', function(action, id, version) {
        id = String(id).trim();
        if (action === 'remove') {
            action = 'rm';
        }
        if (!~['add', 'rm', 'ls'].indexOf(action)) {
            grunt.warn('Unsupported plugin action: "' + action + '"');
        }

        grunt.config.set('cordovacli.options', grunt.config.get('tart.cordova') || { path: 'target' });
        grunt.config.set('cordovacli.plugin.options', {
            command: 'plugin',
            action: action,
            args: [id + (action === 'add' && version ? ('@' + version) : '')]
        });
        grunt.task.run('cordovacli:plugin');

        var pkg = grunt.file.readJSON('package.json');
        if (action === 'rm') {
            delete pkg.cordovaPlugins[id]
        } else if (action === 'add') {
            pkg.cordovaPlugins[id] = version;
        }

        var sorted = {};
        Object.keys(pkg.cordovaPlugins).sort().forEach(function(id) {
            sorted[id] = pkg.cordovaPlugins[id];
        });
        pkg.cordovaPlugins = sorted;

        grunt.file.write('package.json', JSON.stringify(pkg, null, '  ') + '\n');
    });
};
