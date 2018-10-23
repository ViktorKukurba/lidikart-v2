import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AppSettings } from '../constants';
import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

@Injectable()
export class AppDataService {

  // private lang_ = new BehaviorSubject<string>(location.pathname.startsWith("/en") ? 'en' : 'ua');
  // lang = this.lang_.asObservable();
  languages = AppSettings.LANGUAGES;
  private pages_ = new BehaviorSubject<Array<WpPage>>([]);
  private categories_ = new BehaviorSubject<Array<WpCategory>>([]);
  private posts_ = new BehaviorSubject<Array<any>>([]);
  private category_ = new Subject<number>();
  pages = this.pages_.asObservable();
  categories = this.categories_.asObservable();
  posts = this.posts_.asObservable();
  category = this.category_.asObservable();

  postsMap = {};


  constructor(
    public http:HttpClient,
    public translate:TranslateService) {
      translate.setDefaultLang('en');
      translate.onLangChange.subscribe(async (event: LangChangeEvent) => {
        await this.loadPageCategories()
      });
      this.setTranslations();
      translate.use(location.pathname.startsWith("/en") ? 'en' : 'ua');

    this.category.pipe(distinctUntilChanged()).subscribe(categoryId => {
      this.getPostsByCategories([categoryId]).subscribe((posts) => {
        this.posts_.next(posts);
      })
    })
  }

  private setTranslations() {
    this.translate.setTranslation('en', {
      All: 'All',
      Title: 'another world',
      Contact: 'Contact',
      JoinSocial: 'Join us' ,
      FollowSocial: 'Find us in social networks',
      GoShops: 'Visit me'
    });
    this.translate.setTranslation('ua', {
      All: 'Усе',
      Title: 'інший світ',
      Contact: 'Контакти',
      JoinSocial: 'Приєднуйтесь',
      FollowSocial: 'Слідкуйте в мережах',
      GoShops: 'Завітайте на'
    });
  }

  public setCategory(categoryId) {
    this.category_.next(categoryId);
  }

  get langURLPrefix() {
    return AppSettings.LANGUAGES.find(l => l.value === this.langValue).path
  }

  get langValue():string {
    return this.translate.currentLang;
  }

  getAllPosts():Observable<any> {
    return forkJoin(this.http.get(`${SERVICE_URL}/posts?per=1000&lang=${this.langValue}`))
  }

  getCategoryData(categoryId):Observable<any> {
    return forkJoin([
      this.http.get(`${SERVICE_URL}/categories/${categoryId}?lang=${this.langValue}`),
      this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoryId}&lang=${this.langValue}`)
    ]);
  }

  getPostsByCategories(categoriesIds:Array<number|string>):Observable<any> {
    const url = `${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}&lang=${this.langValue}`;
    return new Observable(observer => {
      if (this.postsMap[url]) {
        observer.next(this.postsMap[url]);
        return observer.complete();
      }
      this.http.get(url).subscribe((posts) => {
          this.postsMap[url] = posts;
          observer.next(this.postsMap[url]);
          observer.complete();
        });
    });
  }

  loadPageCategories() {
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100&lang=${this.langValue}`)
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100&lang=${this.langValue}`)
    return forkJoin([pages, categories]).subscribe((response:Array<any>) => {
      var pages = response[0].filter(page => page.slug !== 'production').sort((a, b) => {
        return a.menu_order - b.menu_order;
      });
      var categories = response[1];
      this.categories_.next(categories);
      const langUrl = this.langURLPrefix;

      pages.forEach(function(page) {
        var ids = page.categories;
        page.categories = {};
        page.link = langUrl ? `${langUrl}/${page.slug}` : page.slug;
        categories.filter(function(category) {
          return ids.indexOf(category.id) !== -1;
        }).forEach(function(category) {
          var parentId = category.parent;
          if (parentId) {
            var parent = categories.filter(function(category) {
              return category.id === parentId;
            })[0];
            page.categories[parent.slug] = page.categories[parent.slug] || [];
            page.categories[parent.slug].push(category);
          }
        });
      });
      this.pages_.next(pages);
    })
  }

  getPageCategories():Observable<Array<any>> {
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100&lang=${this.langValue}`)
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100&lang=${this.langValue}`)

    return forkJoin([pages, categories]).pipe(map((response:Array<Array<any>>):Array<any> => {
      var pages = response[0].sort((a, b) => {
        return a.menu_order - b.menu_order;
      });
      var categories = response[1];
      this.categories_.next(categories);
      pages.forEach(function(page) {
        var ids = page.categories;
        page.categories = {};

        categories.filter(function(category) {
          return ids.indexOf(category.id) !== -1;
        }).forEach(function(category) {
          var parentId = category.parent;
          if (parentId) {
            var parent = categories.filter(function(category) {
              return category.id === parentId;
            })[0];
            page.categories[parent.slug] = page.categories[parent.slug] || [];
            page.categories[parent.slug].push(category);
          }
        });
      });
      this.pages_.next(pages);
      return pages;
    }));
  }
}
