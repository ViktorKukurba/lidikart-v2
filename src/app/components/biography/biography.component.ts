import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, pluck, map } from 'rxjs/operators';

import { AppDataService } from '../../services/app-data.service';
import { AppState, selectPageBySlug } from '../../store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiographyComponent implements OnInit {
  pageData: Observable<any>;
  resumeLink: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private appData: AppDataService,
    private element: ElementRef) {

  }

  ngOnInit() {
    this.pageData = this.store.pipe(select(selectPageBySlug, 'about'), filter(p => Boolean(p)));
    this.resumeLink = this.pageData.pipe(
      pluck('acf'),
      map(acf => acf[`resume_${this.appData.langValue}`].url));

    this.pageData.subscribe(() => {
      (<any>window).FB.XFBML.parse(this.element.nativeElement);
    });
  }
}
