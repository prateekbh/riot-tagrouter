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
    frameworks: ['mocha', 'riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-riot'
    ],
    files: [
      '../node_modules/expect.js/index.js',
      './js/promises.js',
      '../build/routerlib.js',
      '**/*.tag',
      'specs.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
  });

  if (process.env.TRAVIS) {
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
    config.plugins.push('karma-phantomjs-launcher');
  }
}
