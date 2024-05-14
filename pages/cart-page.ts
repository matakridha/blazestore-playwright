import { test,expect } from "@playwright/test";
import { Page,Locator } from "playwright";

export class CartPage{
    readonly page:Page;
    readonly cart: {[key: string]:Locator;};
    readonly payment: {[key: string]:string};

    constructor (page:Page){
        this.page = page;
        this.cart = {
            btnDelete : page.locator('//a[text()="Delete"]')
        };

    }

    async verifyTotalPrice(){
        await this.page.waitForSelector('#tbodyid');

        // Function to extract value from td element
        const extractValueFromTd = async (index) => {
            const tdElement = await this.page.$(`#tbodyid tr.success:nth-child(${index}) td:nth-child(3)`);
            const valueText = await tdElement?.textContent();
            return valueText ? parseFloat(valueText) : null;
        };
        
        // Extract numbers
        const number1 = await extractValueFromTd(1); // Index 1 for the first row
        const number2 = await extractValueFromTd(2); // Index 2 for the second row
        
        // Sum up the numbers
        const sum = (number1 !== null ? number1 : 0) + (number2 !== null ? number2 : 0);
        
        // Retrieve the total from the h3 element
        const totalElement = await this.page.$('#totalp');
        const totalText = await totalElement?.textContent();
        const total = totalText ? parseFloat(totalText) : null;
        
        // Compare the sum with the total
        if (sum === total) {
            console.log('Sum and total are equal.');
        } else {
            throw new Error('Sum and total are not equal.');
        }
    }
    
    async deleteItem(){
        await this.page.waitForSelector('#tbodyid');
        await this.cart.btnDelete.click();
        
        expect (this.cart.btnDelete.isHidden).toBe(true);
    }
}