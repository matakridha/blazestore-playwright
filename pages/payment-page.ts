import { Page,Locator } from "playwright";
import { HeaderPage } from "./header-page";
import * as faker from 'faker';
import { expect } from "@playwright/test";

export class PaymentPage{
    readonly page:Page;
    readonly payment: {
        [key: string]:Locator;
    };
    readonly invoice: {
        [key: string]:Locator;
    };
    readonly fake: {[key: string]:string};

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
            btnOk : page.locator('//button[@class="confirm btn btn-lg btn-primary"]'),
            btnOrder : page.locator('//button[text()="Place Order"]')
        };
        this.fake = {
            fakeName :'',
            fakeCountry : '',
            fakeCity : ''
        };
    }

    async buyAnItem(){
        this.fake.fakeName = faker.name.firstName();
        this.fake.fakeCountry = faker.address.country();
        this.fake.fakeCity = faker.address.city();

        await this.invoice.btnOrder.click();

        await this.payment.inputName.type(this.fake.fakeName);
        await this.payment.inputCountry.type(this.fake.fakeCountry);
        await this.payment.inputCity.type(this.fake.fakeCity);
        await this.payment.inputCC.type("23233021010039");
        await this.payment.inputMounth.type("December");
        await this.payment.inputYear.type("2024");

        await this.invoice.btnOk.click();
    }

    async verifyInvoice(){
        await this.invoice.txtInvoice.isVisible();
        expect (await this.invoice.txtInvoice.isVisible()).toBe(true);
    }

    async invalidCheckout(){
        await this.invoice.btnOrder.click();
        await this.invoice.btnOk.click();
    }
    async invalidCheckout2(){
        await this.invoice.btnOrder.click();

        await this.payment.inputName.type("jjd@019=_923d':");
        await this.payment.inputCountry.type("Danbooru");
        await this.payment.inputCity.type("4+=30");
        await this.payment.inputCC.type("a992m2");
        await this.payment.inputMounth.type("'';:");
        await this.payment.inputYear.type("+--`");

        await this.invoice.btnOk.click();
    }

    async verifyInvoiceFailed(){
        expect (await this.invoice.txtInvoice.isVisible()).toBe(false);
    }
    
    async verifyError(){
        expect (await this.payment.inputName.isHidden()).toBe(false);
    }
}