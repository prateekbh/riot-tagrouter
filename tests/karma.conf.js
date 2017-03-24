var projectName = require('../package').name;

var customLaunchers = {
  'SL_Chrome' : {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  'SL_InternetExplorer': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10'
  },
  'SL_FireFox': {
    base: 'SauceLabs',
    browserName: 'firefox',
  }
};

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'riot', 'browserify'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-riot',
      'karma-browserify'
    ],
    files: [
      '../node_modules/expect.js/index.js',
      './js/promises.js',
      '../build/routerlib.js',
      '**/*.tag',
      'specs.js'
    ],
    preprocessors: {
      '**/*.js': ['browserify'],
      '**/*.tag': ['riot']
    },
    browsers: ['Chrome'],
    reporters: ['mocha'],
  });

  if (process.env.TRAVIS && false) {
    config.sauceLabs = {
        testName: projectName
    };
    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.plugins.push('karma-sauce-launcher');
    config.reporters.push('saucelabs');
    config.singleRun = true;
    config.concurrency = 2;
  }else{
    config.singleRun = true;
    config.plugins.push('karma-chrome-launcher');
  }
}
