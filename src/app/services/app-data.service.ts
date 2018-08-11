import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

@Injectable()
export class AppDataService {

  constructor(public http:HttpClient) {

  }

  getAllPosts():Observable<any> {
    return forkJoin(this.http.get(`${SERVICE_URL}/posts?per=1000&lang=en`))
  }

  getCategoryData(categoryId):Observable<any> {
    return forkJoin([
      this.http.get(`${SERVICE_URL}/categories/${categoryId}`),
      this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoryId}`)
    ]);
  }

  getPostsByCategories(categoriesIds:Array<number|string>):Observable<any> {
    return forkJoin(
        this.http.get(`${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}`))
  }

  getPageCategories():Observable<Array<any>> {
    let pages =  this.http.get(`${SERVICE_URL}/pages?per_page=100`)
    let categories = this.http.get(`${SERVICE_URL}/categories?per_page=100`)

    return forkJoin([pages, categories]).pipe(map((response:Array<Array<any>>):Array<any> => {
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
    }));
  }
}
