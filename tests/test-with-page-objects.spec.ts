import { PageManger } from './../page-objects/page-manager';
import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('https://playground.bondaracademy.com/')
})


test('Navigate to form layouts page', async ({ page }) => {
    const pom = new PageManger(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.smartTablePage() 
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.toolTipPage()
})

test('Parameterized page object methods', async ({page})=> {
   const pom = new PageManger(page)
   await pom.navigateTo.formLayoutsPage()
   await pom.formLayoutPage.submitUsingTheGridForm('thaitheyasudanpk@gmail.com', 'Sudan@2805', 'Option 2' )
   await pom.formLayoutPage.submitInlineForm('Thaitheyasudan', 'thaitheyasudanpk@gmail.com', true)
   await pom.navigateTo.datePickerPage()
   await pom.datePickerPage.selectCommonDatepickerDateFromToday(200)
   await pom.datePickerPage.selectDatePickerWithRangeFromToday(7, 20)
}) 