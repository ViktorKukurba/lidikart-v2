import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppDataService } from './app-data.service';
import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';
import { WpPost } from '../interfaces/wp-post';

@Injectable({
  providedIn: 'root'
})
export class WpService {

  readonly SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

  // readonly SERVICE_URL = '//lidikart.loc/wp-json/wp/v2';

  get params() {
    return {
      per_page: '100',
      lang: this.appService.langValue
    };
  }

  constructor(private http: HttpClient, private appService: AppDataService) {}

  loadPostsByCategories(categoriesIds: Array<number>): Observable<WpPost[]> {
    return this.http.get<WpPost[]>(`${this.SERVICE_URL}/posts`, {
      params: {...this.params, categories: categoriesIds.map(String)}});
  }

  loadPages(): Observable<WpPage[]> {
    return this.http.get<WpPage[]>(`${this.SERVICE_URL}/pages`, {params: this.params});
  }

  loadCategories(): Observable<WpCategory[]> {
    return this.http.get<WpCategory[]>(`${this.SERVICE_URL}/categories`, {params: this.params});
  }

  loadBlogs(): Observable<[]> {
    return this.http.get<[]>(`${this.SERVICE_URL}/blogs`, {params: this.params});
  }
}
