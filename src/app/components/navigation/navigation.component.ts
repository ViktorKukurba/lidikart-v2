import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppDataService } from '../../services/app-data.service';
import { WpPage } from '../../interfaces/wp-page';
import { AppState, selectPages } from '../../store/reducers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  pages: Observable<WpPage[]>;
  languages: Array<any>;

  constructor(
    public dataService: AppDataService,
    private store: Store<AppState>,
    private router: Router) {
      this.languages = this.dataService.languages;
      const langUrl = this.dataService.langURLPrefix;
      this.pages = this.store.pipe(select(selectPages), map(pages => pages.map(page => {
        page.link = langUrl ? `${langUrl}/${page.slug}` : page.slug;
        return page;
      })));
    }

  navigateTo(page) {
    this.router.navigate([page]);
  }

  selectLanguage(lang: string) {
    const oldLang = this.dataService.langValue;
    if (oldLang !== lang) {
      this.dataService.translate.use(lang);
      let url = this.router.url.split(';')[0];
      if (oldLang === 'ua') {
        url = `${lang}/${url}`;
      } else if (lang === 'ua') {
        url = url.substring(3);
      }

      let params = null;

      this.router.url.split(';').forEach(item => {
        const [prop, val] = item.split('=');
        if (val) {
          params = params || {};
          params[prop] = val;
        }
      });

      this.dataService.translate.use(lang);
      if (params) {
        this.router.navigate([url, params]);
      } else {
        this.router.navigate([url]);
      }
    }
  }
}
