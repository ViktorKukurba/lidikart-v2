import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { ImageItem } from '@ngx-gallery/core';
import { AppDataService } from './app-data.service';
import { LAGalleryItem } from '../types';

@Injectable()
export class GalleryService {

  private categories_ = new BehaviorSubject<any>([]);
  private posts_ = new BehaviorSubject<any>([]);
  private filteredImages_ = new BehaviorSubject<LAGalleryItem[]>([]);
  private images_ = new Subject<ImageItem[]>();
  private category_ = new Subject<Number>();

  categories = this.categories_.asObservable();
  posts = this.posts_.asObservable();
  images = this.images_.asObservable();
  filteredImages = this.filteredImages_.asObservable();
  category = this.category_.asObservable();

  constructor(private dataService:AppDataService) {
    this.loadPageCategories();
    combineLatest(this.posts, this.category).subscribe((res:Array<[any, Number]>) => {
      var [posts, category] = res;
      this.filteredImages_.next(posts.filter(post => {
        return post.better_featured_image && (!category || category && post.categories.includes(category))
      }).map(this.toImageItem));
    });
  }

  private loadPageCategories() {
    this.dataService.getPageCategories().subscribe((response:Array<any>) => {
      this.categories_.next(response.filter(function(page) {
        return page.slug === 'gallery';
      })[0].categories.art.filter(c => !c.slug.includes('-no-show')));
      var ids = <Array<string|number>>this.categories_.value.map(category => {
        return <string|number>category.id;
      });
      this.dataService.getPostsByCategories(ids).subscribe(response => {
        this.posts_.next(response[0]);
        this.images_.next(response[0].filter(post => {
          return post.better_featured_image || post.format === 'video';
        }).map(post => {
          if (post.format === 'video') {
            return {
              format: post.format,
              url: post.acf.url
            };
          }
          return {
            format: post.format,
            src: post.better_featured_image.source_url,
            thumb: post.better_featured_image.media_details.sizes.thumbnail.source_url
          };
        }));
      });
    })
  }

  private toImageItem(post):LAGalleryItem {
    var imageItem = new ImageItem({
      src: post.better_featured_image.source_url,
      thumb2: post.better_featured_image.media_details.sizes.thumbnail.source_url,
      thumb: post.better_featured_image.media_details.sizes.medium.source_url
    });
    imageItem['post'] = post;
    return <LAGalleryItem>imageItem;
  }

  public setImagesSerie(category:Number):void {
    this.category_.next(+category);
  }
}
