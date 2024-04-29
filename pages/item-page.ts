import { Page,Locator } from "playwright";
import { HeaderPage } from "./header-page";

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
            btnPreveus : page.locator('#prev2'),
            btnNext : page.locator('#next2'),
        }
        this.items = {
            item1 : page.locator('//h4[@class="card-title"]/a[@href="prod.html?idp_=1"]'),
            item2 : page.locator('//h4[@class="card-title"]/a[@href="prod.html?idp_=2"]'),
            item3 : page.locator('//h4[@class="card-title"]/a[@href="prod.html?idp_=3"]'),
            detailTitle : page.locator('h2[class=name]'),
            btnAdd : page.locator('//a[text()="Add to cart"]')
        };
    }

    async checkAllItems(){
        for (let i = 1; i <= 9; i++) {
            const itemLocator = this.page.locator(`//h4[@class="card-title"]/a[@href="prod.html?idp_=${i}"]`);
            const itemText = await itemLocator.textContent();
        
            // Navigate to detail page
            await itemLocator.click();
        
            // Wait for the detail page to load
            await this.page.waitForLoadState('networkidle');
        
            // Get the title on the detail page
            const detailTitleLocator = this.page.locator('h2[class=name]');
            const detailTitle = await detailTitleLocator.textContent();
        
            // Verify the title matches the item text
            if (detailTitle?.trim() === itemText?.trim()) {
                console.log(`Title on detail page matches item ${i}`);
            } else {
                console.error(`Title on detail page does not match item ${i}`);
            }
        
            // Go back to the previous page to check the next item
            await this.page.goBack();
        }
    }   

    async checkPhoneItems(){
        await this.category.phone.click();
        await this.page.waitForTimeout(2000);
// theres no item tag so I use title as verification
        const titles = await this.page.$$eval('.hrefch', links => links.map(link => link.textContent));
        let itemFound = false;
        // Check each title for "vaio" or "macbook"
        for (const title of titles) {
          if (title?.toLowerCase().includes('vaio')||title?.toLowerCase().includes('macbook')) {
            itemFound = true;
            break;
          }
        }
        if (itemFound) console.log('There is non phone.');
        else console.log('There is no non phone.'); 
    }   
    async checkLaptopItems(){
        await this.category.laptop.click();
        await this.page.waitForTimeout(2000);
// theres no item tag so I use title as verification
        const titles = await this.page.$$eval('.hrefch', links => links.map(link => link.textContent));
        let itemFound = false;
        // Check each title for "samsung" or "monitor"
        for (const title of titles) {
          if (title?.toLowerCase().includes('samsung')||title?.toLowerCase().includes('monitor')) {
            itemFound = true;
            break;
          }
        }
        if (itemFound) console.log('There is non laptop.');
        else console.log('There is non laptop.'); 
    }   
    async checkMonitorItems(){
        await this.category.monitor.click();
        await this.page.waitForTimeout(2000);
// theres no item tag so I use title as verification
        const titles = await this.page.$$eval('.hrefch', links => links.map(link => link.textContent));
        let itemFound = false;
        // Check each title for "samsung" or "laptop"
        for (const title of titles) {
          if (title?.toLowerCase().includes('samsung')||title?.toLowerCase().includes('vaio')) {
            itemFound = true;
            break;
          }
        }
        if (itemFound) console.log('There is non monitor.');
        else console.log('There is non monitor.'); 
    }   

    async addToCart(){
        await this.items.item1.click();
        await this.items.detailTitle.isVisible();
        await this.items.btnAdd.click();

        const dialog = await this.page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null); // Wait for dialog or timeout
        await dialog?.accept();
        console.log('Alert dialog appeared and accepted.');
    }

    async addToCart2(){
        const header = new HeaderPage(this.page);
        const dialog = await this.page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null); // Wait for dialog or timeout

        await this.items.item1.click();
        await this.items.detailTitle.isVisible();
        await this.items.btnAdd.click();

        await dialog?.accept();
        console.log('Alert dialog appeared and accepted.');
        await header.headerMenu.menuHome.click();

        await this.items.item2.click();
        await this.items.detailTitle.isVisible();
        await this.items.btnAdd.click();

        await dialog?.accept();
        console.log('Alert dialog appeared and accepted.');
    }
}