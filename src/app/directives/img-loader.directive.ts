import { Directive, OnInit, Input, HostBinding } from '@angular/core';

const DEFAULT_IMG =  require('../../assets/images/lidikart.jpg');

@Directive({
  selector: '[img-loader]',
})
export class ImgLoaderDirective implements OnInit {
  @HostBinding('style.background-size') bgSize = 'cover';
  @HostBinding('style.background-repeat') bgRepeat = 'no-repeat';
  @HostBinding('style.background-position') bgPosition = '50%';
  @HostBinding('style.background-image') 
  private bgImage = `url(${DEFAULT_IMG})`;
  @HostBinding('class.loaded')
  private loaded = false;

  @Input('img-loader')
  private url: string;

  private setImage() {
    this.loaded = true;
    this.bgImage = `url(${this.url})`;
  }

  ngOnInit() {
    const img: HTMLImageElement = <HTMLImageElement>document.createElement('IMG');
    img.src = this.url;
    img.style.display = 'none';
    if (img.complete) {
      this.setImage();
    } else {
      img.onload = () => {
        this.setImage();
      };
    }
    document.body.appendChild(img);
  }
}
