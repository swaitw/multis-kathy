Package.describe({
  name: 'swaitw:style-loader',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileLess",
  use: ['caching-compiler', 'ecmascript', 'underscore'],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {
    // "@babel/runtime": "7.5.5",
    // Fork of 2.5.0, deleted large unused files in dist directory.
    // "less":"3.9.0" 
    "clean-css":"4.2.1",
    "@babel/runtime": "7.0.0",
    "less": "https://github.com/meteor/less.js/tarball/8130849eb3d7f0ecf0ca8d0af7c4207b0442e3f6"
  }
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use('ecmascript');
  api.use('isobuild:compiler-plugin@1.0.0');
  api.mainModule('style-loader.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('swaitw:style-loader');
  api.mainModule('style-loader-tests.js');
});
