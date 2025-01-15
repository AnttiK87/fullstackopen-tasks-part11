// @ts-check
const { defineConfig, devices } = require('@playwright/test')
require('dotenv').config({ path: '.env.test' }) // Lataa ympäristömuuttujat testiä varten

module.exports = defineConfig({
  testDir: './E2E_tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3003',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run start:test',
    url: 'http://localhost:3003/',
    reuseExistingServer: !process.env.CI,
  },
})
