const { test, expect } = require('@playwright/test');


test('Browser Context Validating Error Login', async ({ browser }) => {

    //create a new browser context(instance)
    const context = await browser.newContext();
    //create a new page in a new browser context
    const page = await context.newPage();
    //locators
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const signInBtn = page.locator("input#signInBtn");
    const cardTitles = page.locator(".card-title a");
    //page.route('**/*.{png,jpg,jpeg}', route => route.abort()); //block images
    page.on('request', request => console.log(request.url()));//log all the requests
    page.on('response', response => console.log(response.url(), response.status()));//log all the responses
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
    //await page.pause();
    console.log(allTitles);

});

