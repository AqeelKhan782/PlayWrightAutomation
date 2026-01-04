const playwright = require('@playwright/test');//This step is required to launch the browser and make the page available in the step definition file.
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')


Before(async function () {
    // This hook will be executed before all scenarios
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: `screenshot1.png` });
    }
});

After(function () {
    console.log("Test completed");
});
