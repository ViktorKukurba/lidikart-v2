import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { WpPage } from '../../interfaces/wp-page';
import { AppState, selectPageBySlug } from '../../store/reducers';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent {
  pageData: Observable<WpPage>;
  constructor(private store: Store<AppState>) {
    this.pageData = this.store.select(selectPageBySlug, 'statement');
  }
}
