import { Page,Locator } from "playwright";

export class ContactPage{
    readonly page:Page;
    readonly form: {
        [key: string]:Locator;
    };

    constructor (page:Page){
        this.page = page;
        this.form = {
            title : page.locator('//h5[text()="New message"]'),
            inputEmail : page.locator('input[id=recipient-email]'),
            inputName : page.locator('input[id=recipient-name]'),
            inputMessage : page.locator('input[id=message-text]'),
            btnSend : page.locator('button[text()="Send message"]'),
            btnClose : page.locator('//button[@type="button"]/preceding-sibling::button[text()="Send message"]')
        }
    }
}