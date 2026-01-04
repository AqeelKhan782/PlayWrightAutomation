const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');//we don't need test here beacuse we are using cucumebr but the test is used for MoCA framework.
const playwright = require('@playwright/test');//This step is required to launch the browser and make the page available in the step definition file.

Given('login to the Ecommerce application with {string} and {string}', { timeout: 15 * 1000 }, async function (username, password) {
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});


When('add {string} to the cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});


Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('verify the order is present in the order history page', async function () {
    await this.dashboardPage.navigateToOrders();
    ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('login to the Ecommerce2 application with {string} and {string}', { timeout: 15 * 1000 }, async function (username, password1) {
    const userName = this.page.locator("input#username");
    const password = this.page.locator("input#password");
    const signInBtn = this.page.locator("input#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.type(username);
    await password.type(password1);
    await signInBtn.click();
});


Then('verify error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    //assertion to verify if the text is correct
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});