import { Page,Locator } from "playwright";

export class LoginRegisterPage{
    readonly page:Page;
    readonly loginForm: {
        [key: string]:Locator;
    };
    readonly signForm: {
        [key: string]:Locator;
    };

    constructor (page:Page){
        this.page = page;
        this.loginForm = {
            inputLogUsername : page.locator('#loginusername'),
            inputLogPassword : page.locator('#loginpassword'),
            btnLogin : page.locator('button[text()="Log in"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Log in"]')
        };
        this.signForm = {
            inputSignUsername : page.locator('#sign-username'),
            inputSignPassword : page.locator('#sign-password'),
            btnLogin : page.locator('button[text()="Sign up"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Sign up"]')
        };
    }
}