import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Dialog").click();
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


test('', ()=> {

})