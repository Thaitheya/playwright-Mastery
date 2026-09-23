import { DatePickerPage } from '../page-objects/datepicker-page';
import { FormLayoutPage } from './../page-objects/form-layouts-page';
import { NavigationPage } from './../page-objects/navigation-page';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('https://playground.bondaracademy.com/')
})


test('Navigate to form layouts page', async ({ page }) => {

    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage() 
    await navigateTo.toasterPage()
    await navigateTo.toolTipPage()
})

test('Parameterized page object methods', async ({page})=> {
   const navigateTo = new NavigationPage(page)
   const formLayoutPage = new FormLayoutPage(page)
   const datePickerPage = new DatePickerPage(page)
   await navigateTo.formLayoutsPage()
   await formLayoutPage.submitUsingTheGridForm('thaitheyasudanpk@gmail.com', 'Sudan@2805', 'Option 2' )
   await formLayoutPage.submitInlineForm('Thaitheyasudan', 'thaitheyasudanpk@gmail.com', true)
   await navigateTo.datePickerPage()
   await datePickerPage.selectCommonDatepickerDateFromToday(200)
   await datePickerPage.selectDatePickerWithRangeFromToday(7, 20)
}) 