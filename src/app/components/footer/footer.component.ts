import { Component } from '@angular/core';
import { Contacts } from '../../types';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  pages: Array<Object> = [];
  social = [];
  contacts: Contacts;
  constructor(private dataService: AppDataService) {
    dataService.pages.subscribe(pages => {
      this.pages = pages;
    });
    const {social, contacts} = dataService.getContactsData();
    this.social = social;
    this.contacts = contacts;
  }
}
