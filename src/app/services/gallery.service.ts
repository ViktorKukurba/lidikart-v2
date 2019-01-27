import { Injectable } from '@angular/core';
import { LAGalleryItem } from '../types';
import { WpPost } from '../interfaces/wp-post';

@Injectable()
export class GalleryService {
  static formatPosts(posts: WpPost[], category) {
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
}
