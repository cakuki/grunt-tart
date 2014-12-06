# grunt-tart [![Build Status](https://img.shields.io/travis/cakuki/grunt-tart.svg?style=flat-square)](https://travis-ci.org/cakuki/grunt-tart) [![Stability: Experimental](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)](http://nodejs.org/api/documentation.html#documentation_stability_index)
> tartJS + Cordova build plugin.

CAUTION! Currently requires some grunt tasks to be installed and configured. Initial state intended to work in [tartjs-mobile-demo](https://github.com/tart/tartjs-mobile-demo) only.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tart --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tart');
```

## The "tart" task

### Overview
In your project's Gruntfile, add a section named `tart` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tart: {
    options: {
      compilerDefs: {
          'goog.DEBUG': false
      },
      cordova: {
        id: 'com.tart.example-app',
        name: 'Example tartJS App',
        path: 'target'
      }
    },
    ios: {
      options: {
        compilerDefs: {
          'goog.userAgent.ASSUME_WEBKIT': true
        }
      }
    },
    wp8: {
      options: {
        compilerDefs: {
          'goog.userAgent.ASSUME_IE': true
        }
      }
    },
  },
});
```

Note that objects under options are overridden completely when target option with same key defined. See [grunt issue #738](https://github.com/gruntjs/grunt/issues/738).

### Options

#### options.compilerDefs
Type: `Object.<String, [Boolean|String|Number]>`
Default value: `{ 'goog.DEBUG': true }`

Closure Compiler definition key pairs. Can be changed via `define` cli flag:

` grunt tart:ios --define="goog.DEBUG=false,goog.LOCALE=fr" `

#### options.cordova
Type: `Object`
Default value: `{
                    id: 'com.tart.example-app',
                    name: 'Example tartJS App',
                    path: 'target'
                }`

These options passed into [grunt-cordovacli](https://github.com/csantanapr/grunt-cordovacli) task. See [grunt-cordovacli options documentation](https://github.com/csantanapr/grunt-cordovacli#options) for details.

### Usage Examples

(Coming soon)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* Initial release (06/12/2014 02:36)
