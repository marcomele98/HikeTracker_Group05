const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  env: {
    'cypress-react-selector': {
      root: '#__cy_root',
    },
  },
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": false,
    "json": true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})