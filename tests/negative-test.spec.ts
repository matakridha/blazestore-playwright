import { test, expect, Page } from '@playwright/test';
import { ItemPage } from '../pages/item-page';
import { HeaderPage } from '../pages/header-page';
import { ContactPage } from '../pages/contact-page';
import { LoginRegisterPage } from '../pages/loginRegister-page';

test.describe('Negative Testing Elements',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await expect(page).toHaveURL(global.BASE_URL);
    })
    test ('Register with invalid credential', async ({page}) =>{
        const header = new HeaderPage(page);
        const register = new LoginRegisterPage(page);
        await header.headerMenu.menuSign.click();
        await register.registerWithNoMandatory();
        await register.registerWithNoPassword();
        await register.registerRegisteredID();
    })
    test ('Login with invalid credential', async({page}) =>{
        const header = new HeaderPage(page);
        const login = new LoginRegisterPage(page);
        await header.headerMenu.menuLogin.click();
        await login.loginWithNoPassword();
        await login.loginWithNoMandatory();
    })
})