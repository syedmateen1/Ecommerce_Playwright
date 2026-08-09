import { Page, expect } from "@playwright/test";
import testDataJson from "../utils/testDataJson.json";

export class OrderSummaryPage {

    readonly emailLocator;
    readonly countryLocator;

    constructor(public page: Page) {
        this.page = page;
        this.emailLocator = page.locator("div .text").first();
        this.countryLocator = page.locator("div .text").last();
    }

    async verifyDetails() {

        const email = await this.emailLocator.textContent();
        const country = await this.countryLocator.textContent();
        console.log(email);
        console.log(country);


        expect(await email.includes(testDataJson.username)).toBeTruthy();

        expect(await country.includes(testDataJson.country)).toBeTruthy();
    }
}