import { PageManger } from './page-objects/page-manager';
import { test as base } from '@playwright/test';


type Fixtures = {
    pom: PageManger
}

export const test = base.extend<Fixtures>({
    pom: async ({page}, use) => {
        await page.goto('/')
        const manager = new PageManger(page)
        await use(manager)
    }
})