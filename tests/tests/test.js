'use strict';

const SauceLabs = require("saucelabs");

module.exports = {
    beforeEach: function (browser, done) {
        browser.options.desiredCapabilities.username = process.env.SAUCE_USERNAME;
        browser.options.desiredCapabilities.accessKey = process.env.SAUCE_ACCESS_KEY;
        browser.options.desiredCapabilities.build = process.env.CIRCLE_SHA1 + '_' + process.env.CIRCLE_BUILD_NUM;
        done();
    },
    test: function (browser) {
        browser.url('http://localhost:8080');
        browser.waitForElementVisible('a', 60000);
        browser.end();
    },
    afterEach: function (browser, done) {
        const saucelabs = new SauceLabs({
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_ACCESS_KEY
        });

        const sessionid = browser.capabilities['webdriver.remote.sessionid'];
        const testKey = browser.currentTest.name;
        const testResults = browser.currentTest.results.testcases[testKey];
        saucelabs.updateJob(sessionid, {
            passed: testResults.failed === 0 && testResults.errors === 0,
        }, () => console.info('SauceLabs test status updated'));

        done();
    }
};
