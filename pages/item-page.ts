import { Page,Locator } from "playwright";

export class ItemPage{
    readonly page:Page;
    readonly category: {
        [key: string]:Locator;
    };
    readonly items: {
        [key: string]:Locator;
    };

    constructor (page:Page){
        this.page = page;
        this.category = {
            categorys : page.locator('a[id=cat]'),
            phone : page.locator('//a[text()="Phones"]'),
            laptop : page.locator('//a[text()="Laptops"]'),
            monitor : page.locator('//a[text()="Monitors"]'),
        }
        this.items = {
            item1 : page.locator('//h4[@class="card-title"]/a[@href="prod.html?idp_=1"]'),
            detailTitle : page.locator('h2[class=name]')
        };
    }
}