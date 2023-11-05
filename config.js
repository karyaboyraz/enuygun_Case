module.exports = {
    EnvSettings: {
        production: {
            webUrl: "https://www.enuygun.com",
             apiUrl: "",
        },
    },
    cypressConfig: {
        pageLoadTimeout: 60000,
        defaultCommandTimeout: 15000,
        viewportWidth: 1920,
        viewportHeight: 1080,
        projectId: 'Enuygun_Automation',
        chromeWebSecurity: false,
        modifyObstructiveCode: false
    },
};
