import { Page,Locator } from "playwright";
import * as faker from 'faker';
import { expect } from "@playwright/test";

export class LoginRegisterPage{
    readonly page:Page;
    readonly loginForm: {[key: string]:Locator;};
    readonly signForm: {[key: string]:Locator};
    readonly fake: {[key: string]:string};

    constructor (page:Page){
        this.page = page;
        this.loginForm = {
            inputLogUsername : page.locator('#loginusername'),
            inputLogPassword : page.locator('#loginpassword'),
            btnLogin : page.locator('//button[text()="Log in"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Log in"]'),
            txtUser : page.locator('//a[text()="Welcome admin"]')
        };
        this.signForm = {
            inputSignUsername : page.locator('#sign-username'),
            inputSignPassword : page.locator('#sign-password'),
            btnLogin : page.locator('//button[text()="Sign up"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Sign up"]')
        };
        this.fake= {
            fakerUsername : '',
            fakerPassword : '',
        };
    }

    async validRegister(){
        this.fake.fakerUsername = faker.name.firstName();
        this.fake.fakerPassword = faker.internet.password();
        await this.page.waitForTimeout(2000);
        await this.signForm.inputSignUsername.fill(this.fake.fakerUsername);
        await this.signForm.inputSignPassword.fill(this.fake.fakerPassword);
        await this.signForm.btnLogin.click();
    }
    async verifyRegister(){
        await this.page.waitForTimeout(2000);
        await this.signForm.btnLogin.isHidden();
        expect (await this.signForm.btnLogin.isHidden()).toBe(true);
    }

    async validLogin(){
        await this.page.waitForTimeout(2000);
        await this.loginForm.inputLogUsername.type("admin");
        await this.loginForm.inputLogPassword.type("admin");
        await this.loginForm.btnLogin.click();
    }
    async verifyLogin(){
        await this.page.waitForTimeout(2000);
        await this.loginForm.btnLogin.isHidden();
        expect (await this.loginForm.txtUser.isVisible()).toBe(true);
    }

    async loginWithNoPassword(){
        await this.page.waitForTimeout(2000);
        await this.loginForm.inputLogUsername.type("admin");
        await this.loginForm.inputLogPassword.type("");
        await this.loginForm.btnLogin.click();
        await this.loginForm.inputLogUsername.type("admin");
        await this.loginForm.inputLogPassword.type("a");
        await this.loginForm.btnLogin.click();

        await this.page.waitForTimeout(2000);
        await this.loginForm.btnLogin.isVisible();
        expect (await this.loginForm.txtUser.isVisible()).toBe(false);
    }
    async loginWithNoMandatory(){
        await this.page.waitForTimeout(2000);
        await this.loginForm.inputLogUsername.type("admin");
        await this.loginForm.inputLogPassword.type("");
        await this.loginForm.btnLogin.click();
        
        await this.page.waitForTimeout(2000);
        await this.loginForm.btnLogin.isVisible();
        expect (await this.loginForm.txtUser.isVisible()).toBe(false);
    }

    async registerWithNoMandatory(){
        await this.page.waitForTimeout(2000);
        await this.signForm.inputSignUsername.fill("");
        await this.signForm.inputSignPassword.fill("");
        await this.signForm.btnLogin.click();
        await this.signForm.inputSignUsername.isVisible();
        expect (await this.signForm.inputSignPassword.isVisible()).toBe(true);
 
    }
    async registerWithNoPassword(){
        this.fake.fakerUsername = faker.name.firstName();
        await this.page.waitForTimeout(2000);
        await this.signForm.inputSignUsername.fill(this.fake.fakerUsername);
        await this.signForm.inputSignPassword.fill("");
        await this.signForm.btnLogin.click();
        await this.signForm.inputSignUsername.isVisible();
        expect (await this.signForm.inputSignPassword.isVisible()).toBe(true);
 
    }
    async registerRegisteredID(){
        await this.page.waitForTimeout(2000);
        await this.signForm.inputSignUsername.fill("admin");
        await this.signForm.inputSignPassword.fill("aaa");
        await this.signForm.btnLogin.click();
        await this.signForm.inputSignUsername.isVisible();
        expect (await this.signForm.inputSignPassword.isVisible()).toBe(true);
 
    }
}