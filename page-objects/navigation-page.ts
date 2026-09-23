
import { Locator, Page } from '@playwright/test'

export class NavigationPage {

    private readonly page: Page
    readonly formLayuoutsMenu: Locator
    readonly datePickerMenu: Locator
    readonly toasterMenu: Locator
    readonly tooltipMenu: Locator
    readonly smartTableMenu: Locator


    constructor(page: Page) {
        this.page = page
        this.formLayuoutsMenu = page.getByText('Form Layouts')
        this.datePickerMenu = page.getByText('Datepicker')
        this.smartTableMenu = page.getByText('Smart Table')
        this.toasterMenu = page.getByText('Toastr')
        this.tooltipMenu = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayuoutsMenu.click()
    }
    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenu.click()
    }

    async toasterPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toasterMenu.click()
    }
    async toolTipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenu.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenu.click()
    }

    private async selectGroupMenuItem(groupMenuTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false") {
            await groupMenuItem.click()
        }
    }

}