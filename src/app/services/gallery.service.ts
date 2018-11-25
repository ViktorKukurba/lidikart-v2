import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { AppDataService } from './app-data.service';
import { LAGalleryItem } from '../types';
import { WpPost } from '../interfaces/wp-post';
import { WpCategory } from '../interfaces/wp-category';
import { WpPage } from '../interfaces/wp-page';

@Injectable()
export class GalleryService {

  galleryCategories = new BehaviorSubject<WpCategory[]>([]);
  wallCategories = new BehaviorSubject<Array<WpCategory>>([]);
  posts = new BehaviorSubject<WpPost[]>([]);
  filteredImages = new BehaviorSubject<LAGalleryItem[]>([]);
  category = new Subject<Number>();

  static formatPosts(posts, category) {
    return posts.filter(post => {
      return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category));
    }).map(p => GalleryService.toImageItem(p));
  }

  public static toImageItem(post): LAGalleryItem {
    if (post.format === 'video') {
      const thumb = `https://img.youtube.com/vi/${GalleryService.extractVideoID(post.acf.url)}/sddefault.jpg`;
      return {
        post,
        format: post.format,
        thumb: {
          small: thumb,
          big: thumb
        },
        src: post.acf.url
      };
    }

    const imgUrl = this.getBigThumbUrl(post);
    return {
      post,
      format: post.format,
      thumb: {
        small: post.better_featured_image.media_details.sizes.medium.source_url,
        big: imgUrl
      },
      // src: post.better_featured_image.source_url
      src: this.getLargestImage(post).source_url
    };
  }

  private static getLargestImage(post): any {
    const sizes = post.better_featured_image.media_details.sizes;
    const maxSize = Object.values(sizes).reduce((prev: any, curr: any) => prev.width > curr.width ? prev : curr);
    return maxSize;
  }

  private static getBigThumbUrl(post): any {
    return (Object.values(post.better_featured_image.media_details.sizes).find((img: any) => {
      return img.width >= 600;
    }) || post.better_featured_image).source_url;
  }

  private static extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      console.log('Invalid URL.');
    }
  }


  constructor(private dataService: AppDataService) {
    this.loadPageCategories();
    combineLatest(this.posts, this.category).subscribe((res: [Array<WpPost>, number]) => {
      const [posts, category] = res;
      this.filteredImages.next(posts.filter(post => {
        return (post.better_featured_image || post.format === 'video') && (!category || category && post.categories.includes(category));
      }).map(p => GalleryService.toImageItem(p)));
    });

    this.galleryCategories.subscribe(categories => {
      const ids = categories.map(category => {
        return category.id;
      }).filter(id => Boolean(id));
      if (ids.length) {
        this.dataService.getPostsByCategories(ids).subscribe(response => {
          this.posts.next(response);
        });
      }
    });
  }

  private loadPageCategories() {
    this.dataService.pages.subscribe((pages: Array<WpPage>) => {
      if (pages.length) {
        const galleryCategories = pages.filter(function(page) {
          return page.slug === 'gallery';
        })[0].categoriesMap.art;
        const wallCategories = pages.filter(function(page) {
          return page.slug === 'decor';
        })[0].categoriesMap.production;

        if (galleryCategories.length) {
          galleryCategories.unshift({
            name: this.dataService.langValue === 'ua' ? 'Усе' : 'All'
          });
        }
        this.galleryCategories.next(galleryCategories);
        this.wallCategories.next(wallCategories);
      }
    });
  }

  public setImagesSerie(category: Number): void {
    this.category.next(+category);
  }
}
