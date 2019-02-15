import { Directive, OnInit, OnDestroy, Input, HostBinding, ChangeDetectorRef, Inject } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const DEFAULT_IMG =  require('../../assets/images/lidikart.jpg');

@Directive({
  selector: '[appImgLoader]',
})
export class ImgLoaderDirective implements OnInit, OnDestroy {
  @HostBinding('style.background-size') bgSize = 'cover';
  @HostBinding('style.background-repeat') bgRepeat = 'no-repeat';
  @HostBinding('style.background-position') bgPosition = '50%';
  @HostBinding('style.background-image')
  @Input()
  private bgImage = `url(${DEFAULT_IMG})`;
  @HostBinding('class.loaded')
  private loaded = false;

  private img: HTMLImageElement;

  private loadedSub: Subscription;

  @Input()
  private appImgLoader: string;

  constructor(@Inject(DOCUMENT) private document: Document, private cd: ChangeDetectorRef) {}

  private setImage() {
    this.loaded = true;
    this.bgImage = `url(${this.appImgLoader})`;
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (!this.loaded) {
      document.body.removeChild(this.img);
    }
    if (this.loadedSub) {
      this.loadedSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.img = <HTMLImageElement>this.document.createElement('IMG');
    this.loadedSub = fromEvent(this.img, 'load').subscribe(e => {
      if (this.img.complete) {
        this.setImage();
        document.body.removeChild(this.img);
      }
    });
    this.img.src = this.appImgLoader;
    this.img.style.display = 'none';
    document.body.appendChild(this.img);
  }
}
