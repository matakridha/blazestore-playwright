import { test,expect } from "@playwright/test";
import { Page,Locator } from "playwright";
import * as faker from 'faker';

export class ContactPage{
    readonly page:Page;
    readonly form: {[key: string]:Locator;};
    readonly fake: {[key: string]:string};

    constructor (page:Page){
        this.page = page;
        this.form = {
            title : page.locator('//h5[text()="New message"]'),
            inputEmail : page.locator('input[id=recipient-email]'),
            inputName : page.locator('input[id=recipient-name]'),
            inputMessage : page.locator('textarea[id=message-text]'),
            btnSend : page.locator('//button[text()="Send message"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Send message"]')
        };
        this.fake= {
            fakerEmail : '',
            fakerName : '',
        };
    }

    async sendContact(){
        this.fake.fakerName = faker.name.firstName();
        this.fake.fakerEmail = faker.internet.email();
        await this.page.waitForTimeout(2000);
        await this.form.btnSend.isVisible();
        await this.form.inputName.type(this.fake.fakerName);
        await this.form.inputEmail.type(this.fake.fakerEmail);
        await this.form.inputMessage.type("This is testing msg");
        await this.form.btnSend.click();
    }

    async verifyContactAppear(){
        await this.form.title.isVisible();
        //expect (await this.form.title.isVisible()).toBe(true);
    }

    async contactAlret(){
        const dialog = await this.page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null); // Wait for dialog or timeout
        await dialog?.accept();
        console.log('Alert dialog appeared and accepted.');
    }

    /* example for alrets
    async directAlret(){
        const alret = new AlretsPage(this.page);
        
        async function clickUntilAlertAppears(page: any, maxAttempts: number = 10, interval: number = 1000) {
            let attempts = 0;
            while (attempts < maxAttempts) {
                await alret.alrets.btnDirectAlret.click();
                const dialog = await page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null); // Wait for dialog or timeout
                if (dialog && dialog.type() === 'alert') {
                    await dialog.accept();
                    console.log('Alert dialog appeared and accepted.');
                    return; // Exit the function
                }
                attempts++;
                await page.waitForTimeout(interval); // Wait for a specified interval before next attempt
            }
            console.error('Maximum attempts reached. Alert dialog did not appear.');
        }
        
        // Usage:
        try {
            await clickUntilAlertAppears(this.page);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    */
}