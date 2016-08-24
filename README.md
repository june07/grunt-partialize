# grunt-partialize

> Split whole html files into partial html files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-partialize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-partialize');
```

## The "partialize" task

### Overview
In your project's Gruntfile, add a section named `partialize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  partialize: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.baseTagName
Type: `String`
Default value: `'Partialize'`

A string value that is appended to the names of generated files.

### Usage Examples

```js
grunt.initConfig({
  partialize: {
    options: {
      baseTagName: 'Partialize'
    },
    helloworld: { files: { 'tmp/': 'test/helloworld.html' }}
  }
});
```

Will output the following files to the specified ```'tmp/'``` directory:

```
> dir tmp
 Directory of C:\grunt-partialize\tmp

08/24/2016  03:07 AM    <DIR>          .
08/24/2016  03:07 AM    <DIR>          ..
08/24/2016  03:07 AM                67 Partialize_helloworld-main.html
08/24/2016  03:07 AM               523 Partialize_helloworld-navigation.html
08/24/2016  03:07 AM               382 Partialize_helloworld.html
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_