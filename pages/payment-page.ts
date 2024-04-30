import { Page,Locator } from "playwright";
import { HeaderPage } from "./header-page";

export class ItemPage{
    readonly page:Page;
    readonly payment: {
        [key: string]:Locator;
    };
    readonly invoice: {
        [key: string]:Locator;
    };

    constructor (page:Page){
        this.page = page;
        this.payment = {
            inputName : page.locator('#name'),
            inputCountry : page.locator('#country'),
            inputCity : page.locator('#city'),
            inputCC : page.locator('#card'),
            inputMounth : page.locator('#month'),
            inputYear : page.locator('#year')
        };
        this.invoice = {
            txtInvoice : page.locator('//h2[text()="Thank you for your purchase!"]'),
            btnOk : page.locator('//button[@class="confirm btn btn-lg btn-primary"]')
        };
    }
}