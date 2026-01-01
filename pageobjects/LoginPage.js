class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        // click and wait for a reliable post-login UI element (dashboard products)
        await Promise.all([
            this.signInbutton.click(),
            this.page.waitForSelector('.card-body', { state: 'visible', timeout: 10000 })
        ]);
    }
}
module.exports = { LoginPage };