import {test, expect} from '@playwright/test'



test.beforeEach(async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
});

test.describe("Form layouts Page", ()=> {

    test.beforeEach(async({page})=> {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    })

    test('Input Fields', async({page})=> {
       const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill("thaitheyasudanpk@gmail.com")
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('thaitheyasudanpk@gmail.com', {delay: 500})

        await expect(usingTheGridEmailInput).toHaveValue('thaitheyasudanpk@gmail.com')
        await expect(usingTheGridEmailInput).toHaveValue(/@gmail.com/)
    })

    test('Radio Buttons', async({page})=> {

        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridForm.getByLabel('Option 1').check({force: true});

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true});

        expect(usingTheGridForm).toBeTruthy()

        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked()
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).not.toBeChecked()
    })

})

test('checkbox', async({page})=> {
 await page.getByText('Modal & Overlays').click()
 await page.getByText('Toastr').click()

 await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force: true})

 const allBoxes = page.getByRole('checkbox')

 for(const box of await allBoxes.all()) {
    await box.uncheck({force: true})
    await expect(box).not.toBeChecked()
 }

})

test("Dropdown and List", async ({page})=> {


 await page.getByText('Modal & Overlays').click()
 await page.getByText('Toastr').click()

//Default Dropdown
 await page.locator('.form-group', {hasText: 'Toast type:'}).getByRole('combobox').selectOption('info')
 await expect(page.getByRole('combobox')).toHaveValue('info')

 //Custom Dropdown

 await page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select').click()

 //option 1
//  await page.getByRole('list').getByText('bottom-end').click()

 //Option 2
 await page.locator('nb-option', {hasText: 'bottom-end'}).click()

 expect(page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')).toHaveText('bottom-end')

 //looping through the list

 const positionDropDownField = page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')
 await positionDropDownField.click()
 const allListValues = await page.locator('nb-option').allTextContents()
 for(const listValues of allListValues) {
    await page.locator('nb-option', {hasText: listValues}).click()
    await expect(positionDropDownField).toHaveText(listValues)
    await positionDropDownField.click()
 }

 console.log(allListValues)
})

test('tooltip', async ({page})=> {
 await page.getByText('Modal & Overlays').click()
 await page.getByText('Tooltip').click()

 await page.getByRole('button', {name: 'Top'}).hover()
 await expect (page.getByRole('tooltip')).toHaveText('This is a tooltip')
})

test('dialog Box', async({page})=> {
 await page.getByText('Modal & Overlays').click()
 await page.getByText('Dialog').click()

const card = page.locator('nb-card', {
  hasText: 'Open Dialog with component'
});

await card.getByRole('button', {
  name: 'Open Dialog with component',
  exact: true
}).click();

const dialog = page.locator('nb-card').filter({
  hasText: 'Dialog'
});

await dialog
  .getByRole('button', { name: 'Dismiss Dialog', exact: true })
  .click();


const card2 = page.locator('nb-card', {hasText: 'Open with delay 3 seconds'})

await card2.getByRole('button', {name: 'Open with delay 3 seconds'}).click()
await page.waitForTimeout(3000)

const dialog2 = page.locator('nb-card').filter({
  hasText: 'OK'
});

await dialog2
  .getByRole('button', { name: 'OK', exact: true })
  .click();

}) 

test('Smart Dialog Box', async ({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('tr', {hasText:'mdo@gmail.com'})).not.toBeVisible()

})