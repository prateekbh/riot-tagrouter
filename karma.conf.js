module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-riot'
    ],
    files: [
      'node_modules/expect.js/index.js',
      'build/routerlib.js',
      'tests/**/*.tag',
      'tests/specs.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha']
  });
}