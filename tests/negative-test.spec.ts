import { test, expect, Page } from '@playwright/test';
import { ItemPage } from '../pages/item-page';
import { HeaderPage } from '../pages/header-page';
import { ContactPage } from '../pages/contact-page';
import { LoginRegisterPage } from '../pages/loginRegister-page';
import { CartPage } from '../pages/cart-page';
import { PaymentPage } from '../pages/payment-page';

test.describe('Negative Sign',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await expect(page).toHaveURL(global.BASE_URL);
    })
    test ('Sign - Register with invalid credential', async ({page}) =>{
        const header = new HeaderPage(page);
        const register = new LoginRegisterPage(page);
        await header.headerMenu.menuSign.click();
        await register.registerWithNoMandatory();
        await register.registerWithNoPassword();
        await register.registerRegisteredID();
    })
    test ('Sign - Login with invalid credential', async({page}) =>{
        const header = new HeaderPage(page);
        const login = new LoginRegisterPage(page);
        await header.headerMenu.menuLogin.click();
        await login.loginWithNoPassword();
        await login.loginWithNoMandatory();
    })
})

test.describe('Negative Payment',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await expect(page).toHaveURL(global.BASE_URL);
    })
    test ('Payment - Checkout without an Item', async({page}) =>{
        const header = new HeaderPage(page);
        const cart = new CartPage(page);
        const payment = new PaymentPage(page);
        await header.headerMenu.menuCart.click();
        await payment.invoice.btnOrder.click();
        await payment.verifyError();
    })
    test ('Payment - Checkout with invalid credential', async({page}) =>{
        const item = new ItemPage(page);
        const header = new HeaderPage(page);
        const cart = new CartPage(page);
        const payment = new PaymentPage(page);

        await item.addToCart();
        await header.headerMenu.menuCart.click();
        await payment.invalidCheckout2();
        await payment.verifyInvoiceFailed();
    })
    test ('Payment - Checkout without filled the form', async({page}) =>{
        const item = new ItemPage(page);
        const header = new HeaderPage(page);
        const payment = new PaymentPage(page);

        await item.addToCart();
        await header.headerMenu.menuCart.click();
        await payment.invalidCheckout();
        await payment.verifyInvoiceFailed();
    })
})