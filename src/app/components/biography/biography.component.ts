import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { AppDataService } from '../../services/app-data.service';
import { AppState, selectPageBySlug } from '../../store/reducers';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiographyComponent implements OnInit {
  pageData;
  resumeLink: string;
  constructor(
    private store: Store<AppState>,
    private appData: AppDataService,
    private element: ElementRef) {

  }

  ngOnInit() {
    this.store.pipe(select(selectPageBySlug, 'about'), filter(p => Boolean(p))).subscribe(page => {
      this.pageData = page;
      this.resumeLink = this.pageData.acf[`resume_${this.appData.langValue}`].url;
      (<any>window).FB.XFBML.parse(this.element.nativeElement);
    });
  }
}
