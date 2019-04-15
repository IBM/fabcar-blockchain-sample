import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have the correct title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('Client');
  });

  it('should display header', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('FabCar');
  });

});
