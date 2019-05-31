import { browser } from 'protractor';

import { AppPage } from './app.po';
import { CreateCarForm } from './components/createCarForm';
import { ChangeCarOwnerForm } from './components/changeCarOwnerForm';
import { Submit } from './components/submit';


describe('App', () => {
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

  describe('Submit', () => {
    it('should show the create car form by default', () => {
      return page.navigateTo()
        .then(() => {
          return CreateCarForm.waitToAppear();
        });
    });

    it('should show the change car owner form when clicked on', () => {
      return Submit.changeToForm('Change Car Owner')
      .then(() => {
        return ChangeCarOwnerForm.waitToAppear()
        .then(() => {
          return Submit.changeToForm('Change Car Owner')
          .then(() => {
            return ChangeCarOwnerForm.waitToAppear();
          });
        });
      });
    });

    it('should show the create car form when clicked on', () => {
      return Submit.changeToForm('Change Car Owner')
      .then(() => {
        return Submit.changeToForm('Create Car')
          .then(() => {
            return CreateCarForm.waitToAppear()
            .then(() => {
              return Submit.changeToForm('Create Car')
              .then(() => {
                return CreateCarForm.waitToAppear();
              });
            });
          });
      });
    });
  });
});
