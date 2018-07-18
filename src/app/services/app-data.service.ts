import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

@Injectable()
export class AppDataService {

  constructor(public http:Http) {

  }

  getAllPosts():Observable<any> {
    return Observable.forkJoin(this.http.get(`${SERVICE_URL}/posts?per=1000&lang=en`).map(res => res.json()));
  }

  getCategoryData(categoryId):Observable<any> {
    return Observable.forkJoin([
      this.http.get(`${SERVICE_URL}/categories/${categoryId}`).map(res => res.json()),
      this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoryId}`).map(res => res.json())
    ]);
  }

  getPostsByCategories(categoriesIds:Array<number|string>):Observable<any> {
    return Observable.forkJoin(
        this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}`)
            .map(res => res.json()));
  }

  getPageCategories() {
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100`).map(res => res.json());
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100`).map(res => res.json());

    return Observable.forkJoin([pages, categories]).map((response) => {
      var pages = response[0].sort((a, b) => {
        return a.menu_order - b.menu_order;
      });
      var categories = response[1];
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
      return pages;
    })
  }

}
