const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayLoad = { userEmail: "aqeelmiyankhan@gmail.com", userPassword: "Test!123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
/*
to pass the token in session storage
window.sessionStorage.setItem('token', value);
*/