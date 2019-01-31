import { of } from 'rxjs';

const contactsData = {
  social: [{
    network: 'facebook',
    url: '//facebook.com'
  }],
  contacts: {
    email: 'test@email.com',
    mobile: '000'
  },
  shops: [{
    title: 'Test shop',
    link: '//test.shop.com'
  }]
};

declare const jasmine: any;

export class MockAppDataService {
  constructor() {}
  getContactsData = jasmine.createSpy('getContactsData').and.returnValue(contactsData);
  translate = {
    onLangChange: of() // jasmine.createSpy('translate')
  };
}
