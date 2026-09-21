import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByRole('link', { name: 'Modal & Overlays' }).click();
    await page.getByRole('link', { name: 'Dialog' }).click();
    await page.getByRole('button', { name: 'Open with delay 3 seconds' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('link', { name: 'Window' }).click();
    await page.getByRole('button', { name: 'Open window form' }).click();
    await page.getByRole('textbox', { name: 'Subject:' }).click();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    await page.getByRole('textbox', { name: 'Jane Doe' }).click();
    await page.getByRole('textbox', { name: 'Jane Doe' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Jane Doe' }).fill('T');
    await page.getByRole('textbox', { name: 'Jane Doe' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Thaitheyasudan');
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').click();
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('thaitheyasudanpk@gmail.com');
    await page.locator('.custom-checkbox').first().click();
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByLabel('Remember me').check();
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByRole('button').click(); 
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Dialog").click();
    testInfo.setTimeout(testInfo.timeout + 3000)
});


test('Auto Waiting', async({page}) => {
    const dialogWithDelayForm = page.locator('nb-card', {hasText: 'Open Dialog With Delay'});
    await dialogWithDelayForm.getByRole('button', {name: '3 seconds'}).click()

    const dialogContainer = page.locator('nb-dialog-container')
    // await dialogContainer.waitFor();
    // await page.waitForResponse('**/delay/*')
    // await page.waitForLoadState("networkidle")
    await page.waitForTimeout(3500)

    expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder')
})


test('Timeouts', async ({page})=> {
    test.slow()
    const dialogWithDelayForm = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
    await dialogWithDelayForm.getByRole('button', {name: '3 Seconds'}).click()
    const dialogContainer = page.locator('nb-dialog-container')
    await dialogContainer.getByRole('button', {name: 'Ok'}).click({timeout: 5000})
})


test('Test Generation', async({page})=> {
 await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('thaitheyasudanpk@gmail.com')
})