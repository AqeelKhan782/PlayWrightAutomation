const { test, expect } = require('@playwright/test');


test('Browser Context Playwright test', async ({ browser }) => {

    //create a new browser context(instance)
    const context = await browser.newContext();
    //create a new page in a new browser context
    const page = await context.newPage();
    //locators
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const signInBtn = page.locator("input#signInBtn");
    const cardTitles = page.locator(".card-title a");

    //navigate to the URL
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get title
    console.log(await page.title());
    //enter username and password
    await userName.type("aqeel");
    await password.type("learning");
    //click on sign in button
    await signInBtn.click();
    //get the text of the error message
    console.log(await page.locator("[style*='block']").textContent());
    //assertion to verify if the text is correct
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //clear the username
    await userName.fill("");
    //enter correct username
    await userName.type("rahulshettyacademy");
    //clear the password
    await password.fill("");
    //enter correct password
    await password.type("learning");
    //click on sign in button
    await signInBtn.click();
    //get the text of the card body and print it in the conlole
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    //get all the card titles and print them in the console
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});


test('Page Playwright test', async ({ page }) => {
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const documentLink = page.locator("a[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    // await page.pause();

});

test('Child window handle', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    //click on the link and wait for the new tab (page) to open
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    /* Now in below code we are picking the domain name (rahulshettyacademy.com) from the text from child window and then going to use in username field in parent window */ 
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    // console.log(domain);
    //enter the domain name in username field of parent window
    await page.locator("#username").type(domain);
    // await page.pause();
    console.log(await page.locator("#username").inputValue());

});