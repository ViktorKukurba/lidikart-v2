import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  Subject } from 'rxjs';
import { ImageItem } from '@ngx-gallery/core';
import { AppDataService } from './app-data.service'

@Injectable()
export class GalleryService {

  private categories_ = new BehaviorSubject<any>([]);
  private posts_ = new BehaviorSubject<any>([]);
  private filteredImages_ = new BehaviorSubject<any>([]);
  private images_ = new Subject<ImageItem[]>();
  private category_:String;

  categories = this.categories_.asObservable();
  posts = this.posts_.asObservable();
  images = this.images_.asObservable();
  filteredImages = this.filteredImages_.asObservable();
  filteredPosts:Observable<Array<Object>>;

  constructor(private dataService:AppDataService) {
    this.loadPageCategories();
    this.filteredPosts = this.posts.map(posts => {
      return posts.filter(post => {
        return post.better_featured_image && (!this.category_ || this.category_ && post.categories.includes(+this.category_))
      }).map(this.toImageItem)
    })
  }

  private loadPageCategories() {
    this.dataService.getPageCategories().subscribe(response => {
      this.categories_.next(response.filter(function(page) {
        return page.slug === 'gallery';
      })[0].categories.art);
      var ids = <Array<string|number>>this.categories_.value.map(category => {
        return <string|number>category.id;
      });
      this.dataService.getPostsByCategories(ids).subscribe(response => {
        this.posts_.next(response[0]);
        this.images_.next(response[0].filter(post => {
          return post.better_featured_image;
        }).map(post => new ImageItem(
            post.better_featured_image.source_url,
            post.better_featured_image.media_details.sizes.thumbnail.source_url)));
      });
    })
  }

  private toImageItem(post) {
    var imageItem = new ImageItem(
        post.better_featured_image.source_url,
        post.better_featured_image.media_details.sizes.thumbnail.source_url);
    imageItem['post'] = post
    return imageItem
  }

  public getCategoryImagesObs(category:number):Observable<any> {
    return this.posts.map(posts => {
      return posts.filter(post => {
        return post.better_featured_image && (!category || category && post.categories.includes(+category))
      }).map(this.toImageItem)
    })
  }

  public getCategoryImages(category:number):Array<any> {
    return this.posts_.value.filter(post => {
      return post.better_featured_image && (!category || category && post.categories.includes(+category))
    }).map(this.toImageItem)
  }

  public filterCategory(category): void {
    this.category_ = category;
    var t = this.posts_.value.map(posts => {
      return posts.filter(post => {
        return post.better_featured_image && (!category || category && post.categories.includes(+category))
      }).map(this.toImageItem)
    })
    this.filteredImages_.next(t)
  }
}
