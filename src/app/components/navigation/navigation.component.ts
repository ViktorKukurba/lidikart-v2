import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private routeParams:{lang?:String} = {};
  private url:String = '';
  pages = [];
  languages:Array<any>;
  
  constructor(
    public dataService:AppDataService,
    private router: Router) { 
      this.languages = this.dataService.languages;

      this.dataService.pages.subscribe((pages:Array<any>) => {
        this.pages = pages;
      });
    }

  navigateTo(page) {
    this.router.navigate([page])
  }

  selectLanguage(lang:string) {
    const oldLang = this.dataService.langValue;
    if (oldLang !== lang) {
      this.dataService.translate.use(lang);
      let url = this.router.url.split(';')[0];
      if (oldLang === 'ua') {
        url = `${lang}/${url}`;
      } else if (lang === 'ua') {
        url = url.substring(3);
      }

      var params = null;

      this.router.url.split(';').forEach(item => {
        const [prop, val] = item.split('=')
        if (val) {
          params = params || {};
          params[prop] = val;
        }
      })

      this.dataService.translate.use(lang);
      if (params) {
        this.router.navigate([url, params]);
      } else {
        this.router.navigate([url]);
      }
    }
  }
}
