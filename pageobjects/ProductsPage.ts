import { Page } from "@playwright/test";

import testDataJson from '../utils/testDataJson.json';

export class ProductsPage {
    readonly titles;
    readonly product;
    readonly addToCart;
    readonly cartButton;
    readonly cvvCode;
    readonly nameOnCard;
    readonly coupon;
    readonly typeCountry;
    readonly selectCountry;
    readonly clickApplyCoupon;
    readonly placeOrderButton;

    constructor(public page: Page) {
        this.page = page;
        this.titles = this.page.locator("//div[@class='card-body']");
        this.product = this.page.locator(".card-body");
        this.addToCart = this.page.locator(".card-body");
        this.cartButton = this.page.getByRole("button").filter({ hasText: "cart 1" });
        this.cvvCode = this.page.locator(".form__cc").locator(".row").nth(1).getByRole("textbox");
        this.nameOnCard = this.page.locator(".form__cc").locator(".row").nth(2).getByRole("textbox");
        this.coupon = this.page.locator(".form__cc").locator(".row").nth(3).getByRole("textbox");
        this.typeCountry = this.page.getByPlaceholder("Select Country");
        this.selectCountry = this.page.getByRole("button", { name: " India" }).nth(1);
        this.clickApplyCoupon = this.page.getByRole("button").filter({ hasText: "Apply Coupon" });
        this.placeOrderButton = this.page.locator("div a").filter({ hasText: "Place Order " });
    }

    async addProductToCart() {

        await this.page.waitForSelector("//div[@class='card-body']");

        const count = await this.titles.count();
        console.log(count);
        console.log(await this.titles.allTextContents());
        for (let i = 0; i < count; i++) {
            if (
                (await this.titles.nth(i).locator("b").textContent()) ==
                testDataJson.productToAdd) {
                await this.addToCart.nth(i).getByText("Add to Cart").click();
                break;
            }
        }
    }


    async clickCart() {
        await this.cartButton.click();
    }

    async clickCheckOut() {
        if ((await this.page.locator(".cartSection h3").textContent()) == testDataJson.productToAdd) {
            await this.page.getByRole("button").filter({ hasText: "Checkout" }).click();
        }
    }

    async placeOrder() {
        await this.cvvCode.fill("300");

        await this.nameOnCard.fill("sm");

        await this.coupon.fill("rahulshettyacademy");

        await this.typeCountry.pressSequentially("India");
        await this.selectCountry.click();

        await this.clickApplyCoupon.click();

        await this.placeOrderButton.click();
    }

}