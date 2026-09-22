import { test, expect } from '@playwright/test'



test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/")
});

test.describe("Form layouts Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
  })

  test('Input Fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" })
      .getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.fill("thaitheyasudanpk@gmail.com")
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('thaitheyasudanpk@gmail.com', { delay: 500 })

    await expect(usingTheGridEmailInput).toHaveValue('thaitheyasudanpk@gmail.com')
    await expect(usingTheGridEmailInput).toHaveValue(/@gmail.com/)
  })

  test('Radio Buttons', async ({ page }) => {

    const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

    await usingTheGridForm.getByLabel('Option 1').check({ force: true });

    await usingTheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true });

    expect(usingTheGridForm).toBeTruthy()

    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).not.toBeChecked()
  })

})

test('checkbox', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

  const allBoxes = page.getByRole('checkbox')

  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true })
    await expect(box).not.toBeChecked()
  }

})

test("Dropdown and List", async ({ page }) => {


  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  //Default Dropdown
  await page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').selectOption('info')
  await expect(page.getByRole('combobox')).toHaveValue('info')

  //Custom Dropdown

  await page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select').click()

  //option 1
  //  await page.getByRole('list').getByText('bottom-end').click()

  //Option 2
  await page.locator('nb-option', { hasText: 'bottom-end' }).click()

  expect(page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select')).toHaveText('bottom-end')

  //looping through the list

  const positionDropDownField = page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select')
  await positionDropDownField.click()
  const allListValues = await page.locator('nb-option').allTextContents()
  for (const listValues of allListValues) {
    await page.locator('nb-option', { hasText: listValues }).click()
    await expect(positionDropDownField).toHaveText(listValues)
    await positionDropDownField.click()
  }

  console.log(allListValues)
})

test('tooltip', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()

  await page.getByRole('button', { name: 'Top' }).hover()
  await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
})

test('dialog Box', async ({ page }) => {
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


  const card2 = page.locator('nb-card', { hasText: 'Open with delay 3 seconds' })

  await card2.getByRole('button', { name: 'Open with delay 3 seconds' }).click()
  await page.waitForTimeout(3000)

  const dialog2 = page.locator('nb-card').filter({
    hasText: 'OK'
  });

  await dialog2
    .getByRole('button', { name: 'OK', exact: true })
    .click();

})

test('Smart Dialog Box', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()
  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
  })
  await page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
  await expect(page.locator('tr', { hasText: 'mdo@gmail.com' })).not.toBeVisible()

})


test('Table1', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  //How to select row by any visible text
  const tableRowByEmail = page.getByRole('row', { name: 'karen@yandex.ru' })
  await tableRowByEmail.locator('.nb-edit').click()
  await tableRowByEmail.getByPlaceholder('Age').fill('35')
  await tableRowByEmail.locator('.nb-checkmark').click()

  await expect(tableRowByEmail.locator('td').last()).toHaveText('35')

  //Get row by a specific column value
  const tableRowById = page.getByRole('row').filter({ has: page.getByRole('cell').nth(1).getByText('10') })
  await tableRowById.locator('.nb-edit').click()
  await page.locator('tbody').getByPlaceholder('E-mail').fill('test@test.com')
  await page.locator('tbody').locator('.nb-checkmark').click()
  await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com')
})

test('Table 2', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  const ages = ["20", "30", "40", "200"]
  for (let age of ages) {
    await page.getByPlaceholder('Age').fill(age)

    if (age == "200") {
      await expect(page.locator('tbody')).toContainText('No data found ')
    } else {
      await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age)
      const allTableRows = await page.locator('tbody tr').all()
      for (let row of allTableRows) {
        await expect(row.locator('td').last()).toHaveText(age)
      }
    }
  }
})

test('Date Picker 1', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()

  const calendarInputField = page.getByPlaceholder('Form Picker')
  await calendarInputField.click()

  await page.locator('.day-cell:not(.bounding-month)').getByText('2', { exact: true }).click()
  await expect(calendarInputField).toHaveValue('Sep 2, 2026')
})

test('Date Picker 2', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()

  const calendarInputField = page.getByPlaceholder('Form Picker')
  await calendarInputField.click()
  const date = new Date();
  date.setDate(date.getDate() + 100)

  const expectedDay = date.getDate().toString()
  const expectedMonth = date.toLocaleString('En-US', { month: 'short' })
  const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
  const expectedYear = date.getFullYear()
  const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

  let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

  while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
    await page.locator('.next-month').click()
    currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }
  await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click()
  await expect(calendarInputField).toHaveValue(expectedDate)
})
type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
}
test('sliders', async ({ page }) => {

  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate(element => {
    element.setAttribute('cx', '232.630')
    element.setAttribute('cy', '232.630')
  })
  await tempGauge.click()

  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  const box: Box = (await tempBox.boundingBox())!
  const x = box?.x + box?.width / 2
  const y = box?.y + box?.height / 2

  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 100, y)
  await page.mouse.move(x + 100, y + 100)
  await page.mouse.up()
  await expect(tempBox).toContainText('30')
})

test('IFrames', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Dialog').click()
 
  const frameLocator = page.frameLocator('[data-cy="esc-close-iframe"]')
  await frameLocator.getByRole('button', {name: 'Open Dialog with esc close'}).click()
})

test('Drag and Drop', async({page})=> {
  await page.getByText('Extra Components').click()
  await page.getByText('Drag & Drop').click()
  

  await page.getByText(' Clean my room ').dragTo(page.locator('#drop-list'))

  await page.getByText(' Get groceries').hover()
  await page.mouse.down()

  await page.locator('#drop-list').hover()

  await page.mouse.up()

})