import { DatePickerPage } from '../page-objects/datepicker-page';
import { FormLayoutPage } from './../page-objects/form-layouts-page';
import { NavigationPage } from './../page-objects/navigation-page';
import { Page, test } from '@playwright/test';

export class PageManger {

    readonly navigateTo: NavigationPage
    readonly formLayoutPage: FormLayoutPage
    readonly datePickerPage: DatePickerPage

    constructor(page:Page) {
        this.navigateTo = new NavigationPage(page)
        this.formLayoutPage = new FormLayoutPage(page)
        this.datePickerPage = new DatePickerPage(page)
    }
}