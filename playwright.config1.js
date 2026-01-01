// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  //workers:1,//To run only one file at a time instead of 5 as part of parallel execution.
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshots: 'off',
        // screenshots: 'only-on-failure',
        trace: 'retain-on-failure',//off,on, retain-on-failure
        ...devices['iPhone 11'],
      },


    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshots: 'on',//only-on-failure
        video: 'retain-on-failure',//off,on, retain-on-failure 
        trace: 'retain-on-failure',//off,on, retain-on-failure  
        ignoreHttpsError: true,
        permissions: ['geolocation'],
        // viewport: { width: 720, height: 720 }
      },
    }
  ]




});
module.exports = config; 
