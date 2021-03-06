import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppDataService } from './app-data.service';
import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';
import { WpPost } from '../interfaces/wp-post';
import { environment } from '../../environments/environment';

const {SERVICE_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class WpService {

  get params() {
    return {
      per_page: '100',
      lang: this.appService.langValue
    };
  }

  constructor(private http: HttpClient, private appService: AppDataService) {}

  loadPostsByCategories(categoriesIds: Array<number>): Observable<WpPost[]> {
    return this.http.get<WpPost[]>(`${SERVICE_URL}/posts`, {
      params: {...this.params, categories: categoriesIds.map(String).join(',')}});
  }

  loadPages(): Observable<WpPage[]> {
    return this.http.get<WpPage[]>(`${SERVICE_URL}/pages`, {params: this.params});
  }

  loadCategories(): Observable<WpCategory[]> {
    return this.http.get<WpCategory[]>(`${SERVICE_URL}/categories`, {params: this.params});
  }

  loadBlogs(): Observable<[]> {
    return this.http.get<[]>(`${SERVICE_URL}/blogs`, {params: this.params});
  }

  loadBlog(id: string|number): Observable<[]> {
    return this.http.get<[]>(`${SERVICE_URL}/blogs/${id}`, {params: this.params});
  }
}
