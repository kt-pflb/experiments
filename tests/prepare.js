'use strict';

const sauceConnectLauncher = require('sauce-connect-launcher');
const seleniumDownload = require('selenium-download');


const options = {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    logger: message => console.info(`sc: ${message}`),
    port: 4445,
    detached: true,
    verbose: true
};

sauceConnectLauncher(options, (err, sauceConnectProcess) => {
    if (err) {
        throw err;
    }
    console.log(`Sauce Connect is ready - PID: ${sauceConnectProcess.pid}`);

    process.exit();
});

seleniumDownload.ensure(process.cwd(), function (err) {
    if (err) {
        throw err;
    }
    console.log('Checked Selenium Drivers');
});
