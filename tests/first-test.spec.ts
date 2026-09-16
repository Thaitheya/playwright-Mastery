import {test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

// test('Locator Syntax Rules', ({page})=> {

//      page.locator('input')

//      page.locator('#inputEmail')

//      page.locator(".shape-rectangle")

//      page.locator('[placeholder="Email"]')

//      page.locator('//*[@id="inputEmail"]')

//      page.locator(':text("Using")')

//      page.locator(':text-this("Using the Grid)')
// })

// test('User visible locators', async({page})=> {

//     await page.getByRole('button', {name: "Sign in"}).first().click();
//     await page.getByRole('textbox',{name: "Email"}).first().fill("Sudan");
//     await page.getByLabel('Email').first().fill("thaitheyasudanpk@gmail.com");
//     await page.getByPlaceholder('Jane Doe').fill("sudan25092007@gmail.com");
//     await page.getByText('Submit').first().click();
//     await page.getByTestId('inputEmail1').first().fill("prethikaus@gmail.com");
//     await page.getByTitle('IOT Dashboard').click();
// }) 

test('Locating child elements',  async ({page})=> {

    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
})