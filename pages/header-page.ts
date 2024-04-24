import { Page,Locator } from "playwright";

export class HeaderPage{
    readonly page:Page;
    readonly headerMenu: {
        [key: string]:Locator;
    };

    constructor (page:Page){
        this.page = page;
        this.headerMenu = {
            menuHome : page.locator('a.nav-link:has-text("Home")'),
            menuContact : page.locator('a.nav-link:has-text("Contact")'),
            menuAbout : page.locator('a.nav-link:has-text("About us")'),
            menuCart : page.locator('#cartur'),
            menuLogin : page.locator('#login2'),
            menuSign : page.locator('#signin2'),
            nameUser : page.locator('#nameofuser')
        }
    }

    
}