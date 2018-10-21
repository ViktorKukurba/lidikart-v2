import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { ImageItem } from '@ngx-gallery/core';
import { AppDataService } from './app-data.service';
import { LAGalleryItem } from '../types';

@Injectable()
export class GalleryService {

  private galleryCategories_ = new BehaviorSubject<any>([]);
  private wallCategories_ = new BehaviorSubject<Array<any>>([]);
  private posts_ = new BehaviorSubject<any>([]);
  private filteredImages_ = new BehaviorSubject<LAGalleryItem[]>([]);
  private images_ = new Subject<ImageItem[]>();
  private category_ = new Subject<Number>();

  private lang:String;

  galleryCategories = this.galleryCategories_.asObservable();
  wallCategories = this.wallCategories_.asObservable();
  posts = this.posts_.asObservable();
  images = this.images_.asObservable();
  filteredImages = this.filteredImages_.asObservable();
  category = this.category_.asObservable();

  constructor(private dataService:AppDataService) {
    this.loadPageCategories();
    combineLatest(this.posts, this.category).subscribe((res:Array<[any, Number]>) => {
      var [posts, category] = res;
      this.filteredImages_.next(posts.filter(post => {
        return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category))
      }).map(p => GalleryService.toImageItem(p)));
    });

    dataService.lang.subscribe(lang => {
      this.lang = lang;
    });

    this.galleryCategories.subscribe(categories => {
      var ids = <Array<string|number>>categories.map(category => {
        return <string|number>category.id;
      }).filter(id => Boolean(id));
      ids.length && this.dataService.getPostsByCategories(ids).subscribe(response => {
        this.posts_.next(response);
        this.images_.next(response.filter(post => {
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
    });
  }

  static formatPosts(posts, category) {
    return posts.filter(post => {
      return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category))
    }).map(p => GalleryService.toImageItem(p));
  }

  private loadPageCategories() {
    this.dataService.pages.subscribe((pages:Array<any>) => {
      if (pages.length) {
        var galleryCategories = pages.filter(function(page) {
          return page.slug === 'gallery';
        })[0].categories.art;
        console.log('galleryCategories', galleryCategories);
        var wallCategories = pages.filter(function(page) {
          return page.slug === 'decor';
        })[0].categories.production

        if (galleryCategories.length) {
          galleryCategories.unshift({
            name: this.lang === 'ua' ? 'Усе' : 'All'
          });
        }
        this.galleryCategories_.next(galleryCategories);
        this.wallCategories_.next(wallCategories);
      }
    })
  }

  static toImageItem(post):LAGalleryItem {
    var imageItem = new ImageItem(GalleryService.getThumb(post));
    imageItem['post'] = post;
    return <LAGalleryItem>imageItem;
  }

  private static getThumb(item) {
    if (item.format === 'video') {
      return {
        thumb: "https://img.youtube.com/vi/" + GalleryService.extractVideoID(item.acf.url) + "/mqdefault.jpg"
      };
    }
    return {
      thumb: item.better_featured_image.media_details.sizes.medium.source_url,
      src: item.better_featured_image.source_url
    }
  }

  private static extractVideoID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11 ){
      return match[7];
    } else {
      console.log("Invalid URL.");
    }
  }

  public setImagesSerie(category:Number):void {
    this.category_.next(+category);
  }
}
