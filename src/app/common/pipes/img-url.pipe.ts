import { Pipe, PipeTransform } from '@angular/core';
import { WpPost } from '../../interfaces/wp-post';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  private readonly SRC_MAP = {
    video: post => post.acf.url,
    standard: post => this.getLargestImage(post).source_url
  };

  private readonly SMALL_MAP = {
    video: (post: WpPost) => this.getVideoThumb(post),
    standard: (post: WpPost) => post.better_featured_image.media_details.sizes.medium.source_url,
  };

  private readonly BIG_MAP = {
    video: (post: WpPost) => this.getVideoThumb(post),
    standard: (post: WpPost) => this.getBigThumbUrl(post)
  };

  transform(post: WpPost, type: string): string {
    switch (type) {
      case 'src': return this._src(post);
      case 'small': return this.SMALL_MAP[post.format](post);
      case 'big': return this.BIG_MAP[post.format](post);
      default: return null;
    }
  }

  private _src(post: WpPost) {
    return this.SRC_MAP[post.format](post);
  }

  private getVideoThumb(post) {
    return `https://img.youtube.com/vi/${this.extractVideoID(post.acf.url)}/sddefault.jpg`;
  }

  private getLargestImage(post): any {
    const sizes = post.better_featured_image.media_details.sizes;
    const maxSize = Object.values(sizes).reduce((prev: any, curr: any) => prev.width > curr.width ? prev : curr);
    return maxSize;
  }

  private getBigThumbUrl(post): any {
    return (Object.values(post.better_featured_image.media_details.sizes).find((img: any) => {
      return img.width >= 600;
    }) || post.better_featured_image).source_url;
  }

  private extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      console.log('Invalid URL.');
    }
  }
}
