var projectName = require('../package').name;

const customLaunchers = {
  BS_Chrome: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'chrome',
    browser_version: '47.0'
  },
  BS_Firefox: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'firefox',
    browser_version: '47.0'
  },
  BS_Safari: {
    base: 'BrowserStack',
    os: 'OS X',
    os_version: 'El Capitan',
    browser: 'safari',
    browser_version: '9.0'
  },
  BS_MobileSafari8: {
    base: 'BrowserStack',
    os: 'ios',
    os_version: '8.3',
    browser: 'iphone',
    real_mobile: false
  },
  BS_MobileSafari9: {
    base: 'BrowserStack',
    os: 'ios',
    os_version: '9.1',
    browser: 'iphone',
    real_mobile: false
  },
  BS_InternetExplorer9: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '7',
    browser: 'ie',
    browser_version: '9.0'
  },
  BS_InternetExplorer10: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '8',
    browser: 'ie',
    browser_version: '10.0'
  },
  BS_InternetExplorer11: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'ie',
    browser_version: '11.0'
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
    config.browserStack = {
      project: projectName,
      build: process.env.TRAVIS_BUILD_NUMBER,
      name: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY
    }
    config.plugins.push('karma-browserstack-launcher');
    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.singleRun = true;
    config.concurrency = 2;
  }else{
    config.plugins.push('karma-phantomjs-launcher');
  }
}
