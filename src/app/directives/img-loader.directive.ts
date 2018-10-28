import { Directive, OnInit, Input, ElementRef } from '@angular/core';

const DEFAULT_IMG =  '../../../assets/images/lidikart.jpg';

@Directive({
  selector: '[img-loader]',
  host: {
    '[style.background-size]': '"cover"',
    '[style.background-repeat]': '"no-repeat"',
    '[style.background-position]': '"50%"'
  }
})
export class ImgLoaderDirective implements OnInit {
  @Input('img-loader')
  url: string;
  private loaded: Boolean = false;
  constructor(private element: ElementRef) {
    this.setImage();
  }

  private setImage() {
    const element = this.element.nativeElement;
    element.style.backgroundImage = this.loaded ? `url(${this.url})` : `url(${DEFAULT_IMG})`;
    this.loaded && element.classList.add('loaded');
  }

  ngOnInit() {
    const img: HTMLImageElement = <HTMLImageElement>document.createElement('IMG');
    img.src = this.url;
    img.style.display = 'none';
    if (img.complete) {
      this.loaded = true;
      this.setImage();
    } else {
      img.onload = () => {
        this.loaded = true;
        this.setImage();
      };
    }
    document.body.appendChild(img);
  }
}
