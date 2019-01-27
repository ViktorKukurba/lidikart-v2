import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Contacts } from '../../types';
import { AppDataService } from '../../services/app-data.service';
import { AppState, selectPages } from '../../store/reducers';
import { Observable } from 'rxjs';
import { WpPage } from '../../interfaces/wp-page';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  pages: Observable<WpPage[]>;
  social = [];
  contacts: Contacts;
  version: string;
  constructor(private store: Store<AppState>, public dataService: AppDataService) {
    this.pages = this.store.select(selectPages);
    const {social, contacts} = this.dataService.getContactsData();
    this.social = social;
    this.contacts = contacts;
    this.version = environment.VERSION;
  }
}
