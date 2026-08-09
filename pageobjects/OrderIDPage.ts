import { Page } from "@playwright/test";

export class OrderIDpage {
    public orderIdLocator;
    readonly orderHistoryLink;


    constructor(public page: Page) {
        this.page = page;
        this.orderIdLocator = page.locator("td label").nth(1);
        this.orderHistoryLink = page.locator("td label").nth(0);
    }

    async printOrderIdandGoToOrderHistoryPage() {
        const oid = await this.orderIdLocator.textContent();
        console.log(await this.orderIdLocator.textContent());
        await this.orderHistoryLink.click();
        return oid;
    }
}