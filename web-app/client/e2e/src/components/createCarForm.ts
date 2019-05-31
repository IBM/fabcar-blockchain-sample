import { browser, element, by, ExpectedConditions } from 'protractor';

export class CreateCarForm {

  static waitToAppear() {
    return browser.wait(ExpectedConditions.visibilityOf(element(by.tagName('app-create-car-form'))), 5000);
  }

}
