import { PageManger } from './../page-objects/page-manager';
import { test } from '../fixture';
import { faker } from '@faker-js/faker';


test('Navigate to form layouts page', async ({ pom }) => {

    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.smartTablePage()
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.toolTipPage()
})

test('Parameterized page object methods', async ({ pom }) => {
    const date = new Date()
    const screenshotDate = `${date.getTime()}`
    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWARD!, 'Option 2')
    //    await page.waitForTimeout(500)
    //    await page.screenshot({path: `screenshots/${screenshotDate}.png`})
    await pom.formLayoutPage.submitInlineForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWARD!, true)
    //    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: `screenshots/${screenshotDate}.png`})
    await pom.navigateTo.datePickerPage()
    await pom.datePickerPage.selectCommonDatepickerDateFromToday(200)
    await pom.datePickerPage.selectDatePickerWithRangeFromToday(7, 20)
})  