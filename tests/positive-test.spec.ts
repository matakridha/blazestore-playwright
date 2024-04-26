import { test, expect, Page } from '@playwright/test';
import { ItemPage } from '../pages/item-page';

test.describe('Positive Testing Elements',() => {
    test.beforeEach(async ({page}) => {
        test.setTimeout(120000);
        await page.goto(global.BASE_URL);
        await expect(page).toHaveURL(global.BASE_URL);
    })
    test ('verify Phone Filter', async ({page}) =>{
        const items = new ItemPage(page);
        await items.checkAllItems();
        await items.checkPhoneItems();
        await items.checkMonitorItems();
        await items.checkLaptopItems();
        console.log("verify success");
    })
})