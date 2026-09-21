import { test,expect } from '@playwright/test'


test.beforeEach(async ({page})=> {

    await page.goto("https://playground.bondaracademy.com/")
})

test('Inline form',async ({page}) => {
    await page.getByText("Forms").click()
    await expect(page.getByText('Forms')).toBeVisible()
    await page.getByText("Form Layouts").click()
    await expect(page.getByText('Form Layouts')).toBeVisible()
    const inlineForm = page.locator('nb-card', {hasText: 'Inline form'})
    await expect(inlineForm).toBeVisible()
    const nameInput = inlineForm.getByPlaceholder('Jane Doe')
    await nameInput.fill('Thaitheyasudan')
    await expect(nameInput).toHaveValue('Thaitheyasudan')
    const emailInput = inlineForm.getByPlaceholder('Email')
    await emailInput.fill('thaitheyasudanpk@gmail.com')
    const checkBox = inlineForm.getByRole('checkbox')
    await checkBox.check({force: true})
    await expect(checkBox).toBeChecked()
    const submit  = inlineForm.getByRole('button', {name: 'Submit'})
    await expect(submit).toBeVisible()
    await expect(submit).toBeEnabled()
    await submit.click()
})

test('Toastr', async ({page})=> {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    

})