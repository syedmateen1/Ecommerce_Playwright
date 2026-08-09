import { Page } from "@playwright/test";
import { orderIDpage } from "./OrderIDPage";

export class OrderHistoryPage {
    readonly rows;
    readonly viewButton;

    constructor(public page: Page) {
        this.page = page;
        this.rows = this.page.locator("tbody tr");
        this.viewButton = page.locator("td").getByRole("button", { name: "View" });
    }



    async clickViewButton(orderid) {
        await this.page.waitForSelector("tbody");

        await this.page.locator("table").nth(0).waitFor();

        const rowCount = await this.rows.count();
        console.log(rowCount);

        for (let i = 0; i < (await rowCount); i++) {
            if (
                await orderid.includes(await this.page.locator("tbody tr").nth(i).locator("th").textContent())
            ) {
                await this.page.locator("td").getByRole("button", { name: "View" }).nth(i).click();
                break;
            }
        }

    }

}