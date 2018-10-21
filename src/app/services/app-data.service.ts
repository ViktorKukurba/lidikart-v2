import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../constants';

import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

@Injectable()
export class AppDataService {

  private lang_ = new BehaviorSubject<string>(location.pathname.startsWith("/en") ? 'en' : 'ua');
  lang = this.lang_.asObservable();
  languages = AppSettings.LANGUAGES;
  private pages_ = new BehaviorSubject<Array<WpPage>>([]);
  private categories_ = new BehaviorSubject<Array<WpCategory>>([]);
  private posts_ = new BehaviorSubject<Array<any>>([]);
  private category_ = new Subject<number>();
  pages = this.pages_.asObservable();
  categories = this.categories_.asObservable();
  posts = this.posts_.asObservable();
  category = this.category_.asObservable();


  constructor(public http:HttpClient) {
    this.lang.subscribe(async () => {
      await this.loadPageCategories()
    });

    this.category.subscribe(categoryId => {
      this.getPostsByCategories([categoryId]).subscribe((posts) => {
        console.log('test111', posts);
        this.posts_.next(posts);
      })
    })
  }

  public setLanguage(lang:string):void {
    this.lang_.next(lang);
  }

  public setCategory(categoryId) {
    this.category_.next(categoryId);
  }

  get langURLPrefix() {
    return AppSettings.LANGUAGES.find(l => l.value === this.lang_.value).path
  }

  get langValue():string {
    return this.lang_.value;
  }

  getAllPosts():Observable<any> {
    return forkJoin(this.http.get(`${SERVICE_URL}/posts?per=1000&lang=${this.lang_.value}`))
  }

  getCategoryData(categoryId):Observable<any> {
    return forkJoin([
      this.http.get(`${SERVICE_URL}/categories/${categoryId}?lang=${this.lang_.value}`),
      this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoryId}&lang=${this.lang_.value}`)
    ]);
  }

  getPostsByCategories(categoriesIds:Array<number|string>):Observable<any> {
    return this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}&lang=${this.lang_.value}`)
  }

  loadPageCategories() {
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100&lang=${this.lang_.value}`)
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100&lang=${this.lang_.value}`)
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
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100&lang=${this.lang_.value}`)
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100&lang=${this.lang_.value}`)

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
            console.log('parent.slug', parent.slug);
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
