/*
 * grunt-tart
 * https://github.com/cakuki/grunt-tart
 *
 * Copyright (c) 2014 Startup Kitchen
 * Licensed under the Apache-2.0 license.
 */

'use strict';

var _ = require('lodash');
var parseOptions = require('../lib/parseOptions');

module.exports = function tart(grunt) {

    grunt.registerMultiTask('tart', 'tartJS + Cordova build plugin.', function() {
        var options = this.options({
            compilerDefs: {
                'goog.DEBUG': true
            },
            cordova: {
                id: 'com.tart.example-app',
                name: 'Example tartJS App',
                path: 'target'
            }
        });
        grunt.config.set('cordovacli.options', options.cordova);

        var plugins = grunt.file.isFile('package.json') && grunt.file.readJSON('package.json')['cordovaPlugins'];
        plugins = Array.isArray(plugins) ? plugins : [];

        var level = grunt.option('link') ? 'dev' : 'production';
        var platform = grunt.option('web') ? 'web' : 'device';
        var env = grunt.option('env') || 'test';
        var target = this.target;

        var cdvArgs = [];

        if (!grunt.file.isFile('config', env + '.js')) {
            grunt.warn('Unknown environment.\n');
        }

        if (!grunt.file.isDir(options.cordova.path)) {
            grunt.log.writeln('Cordova target has not been created yet, trying to create automatically.');
            grunt.config.set('cordovacli.autoCreate', {
                options: {
                    command: 'create'
                }
            });
            grunt.task.run('cordovacli:autoCreate');
        }

        if (!grunt.file.isDir(options.cordova.path, 'platforms', target)) {
            grunt.log.writeln('"' + target + '" platform not found, trying to add automatically.');
            grunt.config.set('cordovacli.autoAddPlatform', {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: [target]
                }
            });

            if (plugins.length) {
                grunt.config.set('cordovacli.autoAddPlugins', {
                    options: {
                        command: 'plugin',
                        action: 'add',
                        plugins: plugins
                    }
                });
                grunt.task.run('cordovacli:autoAddPlugins');
            }
        }

        if (grunt.option('no-run') && grunt.option('release')) {
            cdvArgs.push('--release');
            if (grunt.option('env') && grunt.option('env') !== 'production') {
                grunt.warn('Release flag should not be used with environments other than production.');
            }
            env = 'production';
            level = 'production';
        }
        if (grunt.option('run') === 'device') {
            cdvArgs.push('--device');
        }

        grunt.config.set('closureBuilder.options.compilerOpts.define',
            parseOptions(options.compilerDefs, grunt.option('define')));
        grunt.config.set('cordovacli.options', options.cordova);
        grunt.config.set('cordovacli.autobuild.options', {
            command: grunt.option('run') ? 'run' : 'build',
            platforms: [target],
            args: cdvArgs
        });

        grunt.task.run(level, platform, env, 'cordovacli:autobuild');
    });

};
