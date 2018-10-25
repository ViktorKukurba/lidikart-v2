import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { AppDataService } from './app-data.service';
import { LAGalleryItem } from '../types';
import { WpPost } from '../interfaces/wp-post';
import { WpCategory } from '../interfaces/wp-category';
import { WpPage } from '../interfaces/wp-page';

@Injectable()
export class GalleryService {

  private galleryCategories_ = new BehaviorSubject<WpCategory[]>([]);
  private wallCategories_ = new BehaviorSubject<Array<WpCategory>>([]);
  private posts_ = new BehaviorSubject<WpPost[]>([]);
  private filteredImages_ = new BehaviorSubject<LAGalleryItem[]>([]);
  private category_ = new Subject<Number>();

  galleryCategories = this.galleryCategories_.asObservable();
  wallCategories = this.wallCategories_.asObservable();
  posts = this.posts_.asObservable();
  filteredImages = this.filteredImages_.asObservable();
  category = this.category_.asObservable();

  constructor(private dataService: AppDataService) {
    this.loadPageCategories();
    combineLatest(this.posts, this.category).subscribe((res: [Array<WpPost>, number]) => {
      const [posts, category] = res;
      this.filteredImages_.next(posts.filter(post => {
        return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category))
      }).map(p => GalleryService.toImageItem(p)));
    });

    this.galleryCategories.subscribe(categories => {
      const ids = categories.map(category => {
        return category.id;
      }).filter(id => Boolean(id));
      ids.length && this.dataService.getPostsByCategories(ids).subscribe(response => {
        this.posts_.next(response);
      });
    });
  }

  static formatPosts(posts, category) {
    return posts.filter(post => {
      return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category))
    }).map(p => GalleryService.toImageItem(p));
  }

  private loadPageCategories() {
    this.dataService.pages.subscribe((pages: Array<WpPage>) => {
      if (pages.length) {
        const galleryCategories = pages.filter(function(page) {
          return page.slug === 'gallery';
        })[0].categories.art;
        const wallCategories = pages.filter(function(page) {
          return page.slug === 'decor';
        })[0].categories.production

        if (galleryCategories.length) {
          galleryCategories.unshift({
            name: this.dataService.langValue === 'ua' ? 'Усе' : 'All'
          });
        }
        this.galleryCategories_.next(galleryCategories);
        this.wallCategories_.next(wallCategories);
      }
    })
  }

  public static toImageItem(post):LAGalleryItem {
    if (post.format === 'video') {
      return {
        post,
        format: post.format,
        thumb: `https://img.youtube.com/vi/${GalleryService.extractVideoID(post.acf.url)}/mqdefault.jpg`
      }
    }
    return {
      post,
      format: post.format,
      thumb: post.better_featured_image.media_details.sizes.medium.source_url,
      src: post.better_featured_image.source_url
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
