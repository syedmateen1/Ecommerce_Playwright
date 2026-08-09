//@ts-check

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import testDataJson from '../utils/testDataJson.json';
import { ProductsPage } from "../pageobjects/ProductsPage";
import { OrderIDpage } from "../pageobjects/OrderIDPage";
import { OrderHistoryPage } from "../pageobjects/OrderHistoryPage";
import { OrderSummaryPage } from "../pageobjects/OrderSummaryPage";


test("End to End flow covering login, product selection, and placing order ", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page);
    const orderIdPage = new OrderIDpage(page);
    const orderHistoryPageobj = new OrderHistoryPage(page);
    const orderSummaryPageobj = new OrderSummaryPage(page);

    //Login to the application
    await loginPage.gotoLoginPage();
    await loginPage.fillLoginDetails(testDataJson);
    await page.waitForLoadState("networkidle");
    //Select product and place order
    await productPage.addProductToCart();
    await productPage.clickCart();
    await productPage.clickCheckOut();
    await productPage.placeOrder();
    //Verify order details in order history page
    const orderid = await orderIdPage.printOrderIdandGoToOrderHistoryPage();
    await orderHistoryPageobj.clickViewButton(orderid);
    await orderSummaryPageobj.verifyDetails();

});
