import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, selectPageBySlug, selectPageCategories } from '../../store/reducers';
import { Observable } from 'rxjs';
import { WpPage } from '../../interfaces/wp-page';
import { WpCategory } from '../../interfaces/wp-category';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {
  exhibitions: Observable<WpCategory[]>;
  pageData: Observable<WpPage>;

  private readonly slug = 'exhibitions';
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pageData = this.store.select(selectPageBySlug, this.slug);
    this.exhibitions = this.store.select(selectPageCategories(this.slug));
  }
}
