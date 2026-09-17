import {test, expect} from '@playwright/test'


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

test('Locating the parent elements', async ({page})=> {
await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('button').click();
await page.locator('nb-card')
.filter({has:page.locator("nb-checkbox")})
.filter({hasText: 'Sign in'})
.getByLabel('Email')
.fill('thaitheyasudanpk@gmail.com');
await page.getByText('Using the Grid').locator('..').getByRole('button').click();
}) 

test('Reusing Locator', async({page})=> {
const basicFormSection =  page.locator('nb-card', {hasText: 'Basic form'});
const emailInputField = basicFormSection.getByLabel('Email')

await emailInputField.fill('thaitheyasudanpk@gmail.com')
await basicFormSection.getByLabel('password').fill('Sudan@2805')
await basicFormSection.locator('nb-checkbox').click()
await basicFormSection.getByRole('button').click()

await expect(emailInputField).toHaveValue('thaitheyasudanpk@gmail.com')

})


test.only('Extracting Value', async ({page})=> {
    const basicFormSection =  page.locator('nb-card', {hasText: 'Basic form'});
    const submitButtonText = await basicFormSection.getByRole('button').textContent();
    expect(submitButtonText).toEqual('Submit')

    //Extract multiple text values
    const extractionRadios = await page.locator('nb-radio').allTextContents();
    expect(extractionRadios).toContain('Option 1')

    const emailInputField = basicFormSection.getByRole('textbox',{name:'Email'})
    await emailInputField.fill('thaitheyasudanpk@gmail.com')

    const extractValue = await emailInputField.inputValue();
    console.log(extractValue)
    //Attribute Value
    const emailPlaceHolder = await emailInputField.getAttribute('placeholder')
    console.log(emailPlaceHolder)
})

test('Assertions', async({page}) => {

    //Generic assertions
    const value  = 5;
    expect(value).toEqual(5);

    const basicFormSection =  page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button');

    const submitButtonText = await basicFormSection.textContent();
    expect(submitButtonText).toEqual('Submit')

    //Locator Assertion
    await expect(basicFormSection).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormSection).toHaveText('Submit ')
    await basicFormSection.click();
})


