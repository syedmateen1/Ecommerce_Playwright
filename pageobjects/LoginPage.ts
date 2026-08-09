import { Page } from "@playwright/test";

import testDataJson from '../utils/testDataJson.json';

export class LoginPage {
    readonly username;
    readonly password;
    readonly loginbutton;

    constructor(public page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
        this.loginbutton = page.locator("[id='login']");
    }

    async gotoLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
        await this.page.waitForLoadState("networkidle");

    }

    async fillLoginDetails(testDataJson) {
        await this.username.fill(testDataJson.username);
        await this.password.fill(testDataJson.password);
        await this.loginbutton.click();
        await this.page.waitForLoadState("networkidle");


    }

}