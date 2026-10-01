import { test, expect } from '@playwright/test'

test('Input Fields',{tag: ['@smoke','@fields']}, async ({ page }, testInfo) => {
    await page.goto("https://playground.bondaracademy.com/")
    if(testInfo.project.name == 'mobile-test') {
      await page.locator('.sidebar-toggle').click()
    }
    
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    if(testInfo.project.name == 'mobile-test') {
      await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" })
      .getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.fill("thaitheyasudanpk@gmail.com")
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('thaitheyasudanpk@gmail.com', { delay: 500 })

    await expect(usingTheGridEmailInput).toHaveValue('thaitheyasudanpk@gmail.com')
    await expect(usingTheGridEmailInput).toHaveValue(/@gmail.com/)
  })