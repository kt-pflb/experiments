module.exports = {
    src_folders: ["tests/tests"],
    output_folder: "reports",

    selenium: {
        start_process: true,
        server_path: 'selenium.jar',
        log_path: "selenium.log",
        port: 4444,
        cli_args: {
            "webdriver.chrome.driver": ""
        }
    },

    test_settings: {
        default: {
            selenium_port : 80,
            selenium_host : "ondemand.saucelabs.com",
            silent: true,
            screenshots: {
                enabled: false,
                path: ""
            }
        },

        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                javascriptEnabled: true,
                acceptSslCerts: true,
                platform: 'macOS 10.12',
                newCommandTimeout: 60
            }
        }
    }
};