import { Directive, OnInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[img-loader]'
})
export class ImgLoaderDirective implements OnInit {
  @Input('img-loader')
  url: string;
  constructor(private element:ElementRef) {}

  private setBackgroung() {
    const element:HTMLElement = this.element.nativeElement;
    element.style.backgroundImage = `url(${this.url})`;
    element.classList.add('loaded');
  }

  ngOnInit() {
    var img:HTMLImageElement = <HTMLImageElement>document.createElement('IMG');
    img.src = this.url;
    img.style.display = 'none';
    if (img.complete) {
      this.setBackgroung();
    } else {
      img.onload = () => {
        this.setBackgroung();
      };
    }
    document.body.appendChild(img);
  }
}
