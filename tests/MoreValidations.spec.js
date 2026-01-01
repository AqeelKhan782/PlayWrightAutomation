const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:'parallel'});//To run the test in parallel
//test.describe.configure({mode:'serial'});//To run the test in serial or sequentially
test("@Web Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    page.on('dialog', dialog => dialog.accept());
    // page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framesPage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);

});

test("Screen shot & visual comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });//To take screenshot of specific element
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' });//To take full page screenshot
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot ->stroe ->screen shot ->compare
test("visual", async ({ page }) => {
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});