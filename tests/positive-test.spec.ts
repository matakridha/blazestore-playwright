import { test, expect, Page } from '@playwright/test';
import { ItemPage } from '../pages/item-page';
import { HeaderPage } from '../pages/header-page';
import { ContactPage } from '../pages/contact-page';
import { LoginRegisterPage } from '../pages/loginRegister-page';
import { CartPage } from '../pages/cart-page';
import { PaymentPage } from '../pages/payment-page';

test.describe('Positive Testing Elements',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await expect(page).toHaveURL(global.BASE_URL);
    })
    test ('Items - Verify Phone Filter', async ({page}) =>{
        const items = new ItemPage(page);
        await items.checkAllItems();
        await items.checkPhoneItems();
        await items.checkMonitorItems();
        await items.checkLaptopItems();
        console.log("verify success");
    })
    test ('Contact - Send contact with valid data', async ({page}) =>{
        const header = new HeaderPage(page);
        const contact = new ContactPage(page);
        await header.headerMenu.menuContact.click();
        await contact.verifyContactAppear();
        await contact.sendContact();
        await contact.contactAlret();
        console.log("send msg contact success");
    })
    test ('Sign - Register with valid credential', async ({page}) =>{
        const header = new HeaderPage(page);
        const register = new LoginRegisterPage(page);
        const contact = new ContactPage(page);
        await header.headerMenu.menuSign.click();
        await register.validRegister();
        await contact.contactAlret();
        await register.verifyRegister();
        console.log("register success");
    })
    test ('Sign - Login with valid credential', async ({page}) =>{
        const header = new HeaderPage(page);
        const login = new LoginRegisterPage(page);
        const contact = new ContactPage(page);
        await header.headerMenu.menuLogin.click();
        await login.validLogin();
        await contact.contactAlret();
        await login.verifyLogin();
        console.log("login success");
    })

    test ('Cart - Add item and verify total price', async({page}) =>{
        const header = new HeaderPage(page);
        const item = new ItemPage(page);
        const cart = new CartPage(page);
        await item.addToCart();
        await cart.deleteItem();
        await item.addToCart2();
        await header.headerMenu.menuCart.click();
        await cart.verifyTotalPrice();
        console.log("Verify success, Total item correct");        
    })

    test ('Payment - Process Payment', async({page}) =>{
        const header = new HeaderPage(page);
        const item = new ItemPage(page);
        const pay = new PaymentPage(page);
        await item.addToCart2();
        await header.headerMenu.menuCart.click();
        await pay.buyAnItem();
        await pay.verifyInvoice();
        console.log("Verify success, buying item");  
    })
})