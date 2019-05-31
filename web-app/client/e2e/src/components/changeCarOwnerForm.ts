import { browser, element, by, ExpectedConditions } from 'protractor';

export class ChangeCarOwnerForm {

  static waitToAppear() {
    return browser.wait(ExpectedConditions.visibilityOf(element(by.tagName('app-change-car-owner-form'))), 5000);
  }

}
