var projectName = require('../package').name;

var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '47'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '10'
    }
  }

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
