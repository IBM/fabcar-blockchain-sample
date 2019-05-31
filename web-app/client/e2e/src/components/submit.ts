import { browser, element, by, ExpectedConditions } from 'protractor';

export class Submit {

  static waitToAppear() {
    return browser.wait(ExpectedConditions.visibilityOf(element(by.tagName('app-create-car-form'))), 5000);
  }

  static changeToForm(desiredForm: string) {
    const desiredFormButton = element(by.buttonText(desiredForm));
    return desiredFormButton.click();
  }

}
