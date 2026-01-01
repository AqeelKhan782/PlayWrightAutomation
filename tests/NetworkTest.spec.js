const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayLoad = { userEmail: "aqeelmiyankhan@gmail.com", userPassword: "Test!123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   // await page.pause();

    console.log(await page.locator(".mt-4").textContent());



});
/*
As part of this test we are intercepting the API response and providing our fake response to the browser to validate the scenario where there are no orders placed by the user even though an order is created via API.
*/