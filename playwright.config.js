// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    //screenshots: 'on',
    screenshots: 'only-on-failure',
    trace: 'retain-on-failure',//off,on, retain-on-failure

  },



});
module.exports = config; 
