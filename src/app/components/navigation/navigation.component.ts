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
  language:String;
  
  constructor(
    private dataService:AppDataService,
    private router: Router) { 
      this.languages = this.dataService.languages;

      this.dataService.pages.subscribe((pages:Array<any>) => {
        this.pages = pages;
      });
  
      this.dataService.lang.subscribe((lang:string) => {
        this.language = lang;
      });

      console.log('this.router.url', this.router.url);
    }

  get title() {
    return this.language === 'ua' ? 'інший світ' : 'another world';
  }

  navigateTo(page) {
    this.router.navigate([page])
  }

  selectLanguage(lang:string) {
    if (this.language !== lang) {
      let url = this.router.url.split(';')[0];
      if (this.language === 'ua') {
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

      this.dataService.setILanguage(lang);
      if (params) {
        this.router.navigate([url, params]);
      } else {
        this.router.navigate([url]);
      }
    }
  }
}
