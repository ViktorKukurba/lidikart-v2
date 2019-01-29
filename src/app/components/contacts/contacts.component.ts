import { Component } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  social: Array<any> = [];
  contacts;
  shops: Array<any> = [];
  constructor(private dataService: AppDataService) {
    const {social, contacts, shops} = this.dataService.getContactsData();
    this.social = social;
    this.contacts = contacts;
    this.shops = shops;
  }
}
