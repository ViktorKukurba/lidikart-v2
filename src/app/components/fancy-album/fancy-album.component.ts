import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppSettings } from '../../constants';
import { LAGalleryItem } from '../../types';
import { Observable } from 'rxjs';
declare var jQuery: any;
const FB = (<any>window).FB;
@Component({
  selector: 'app-fancy-album',
  templateUrl: './fancy-album.component.html',
  styleUrls: ['./fancy-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyAlbumComponent implements OnInit, OnDestroy {
  @Input()
  items: Observable<LAGalleryItem[]>;
  @Input()
  pic: number;
  @Input()
  size: 'big';
  url: String;
  routeParams;

  private pictures: LAGalleryItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  private fancyConfig = {
    'beforeShow.fb': (e, instance, current, firstRun) => {
      this.pic = current.opts.picId;
      this.routeParams.pic = this.pic;
      this.router.navigate([this.url || AppSettings.ROUTE.GALLERY, this.routeParams]);
    },
    'afterLoad.fb': () => {
      const el = document.getElementById(`fb-like-${this.pic}`);
      el.setAttribute('data-href', location.href);
      FB.XFBML.parse(el.parentNode);
    },

    'beforeClose.fb': () => {
      this.pic = null;
      delete this.routeParams.pic;
      if (Object.keys(this.routeParams).length) {
        this.router.navigate([this.url, this.routeParams]);
      } else {
        this.router.navigate([this.url]);
      }
    }
  };

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.url = url.map(us => us.path).join('/');
    });

    this.route.params.subscribe(params => {
      this.routeParams = {...params};
      delete this.routeParams.id;
      this.pic = +params.pic;
      if (!this.pic) {
        jQuery.fancybox.close();
      }
    });

    this.items.subscribe(items => {
      this.pictures = items;
    });

    this.initFancyBox();
    this.openPic();
  }

  ngOnDestroy() {
    jQuery.fancybox.defaults.caption = undefined;
    jQuery(document).off(this.fancyConfig);
  }

  get sizeClass() {
    if (this.size) {
      return {
        [`size-${this.size}`]: true
      };
    }
    return null;
  }

  get sizeVal() {
    return this.size || 'big';
  }

  private openPic() {
    if (this.pic) {
      const click = () => {
        if (this.pictures.length) {
          jQuery(`[data-pic-id="${this.pic}"]`).click();
        } else {
          setTimeout(click, 1e1);
        }
      };
      click();
    }
  }

  private initFancyBox(): void {
    jQuery.fancybox.defaults.hash = false;
    jQuery.fancybox.defaults.caption = (instance, item) => {
      let id = item.opts.picId;
      if (typeof id === 'string') {
        id = +id.replace('pic-', '');
      }
      const post = this.pictures.find(i => i.post.id === id).post;
      const tmpl = `<div class="fb-like" id=fb-like-${id}
      data-href="https://lidikart.com.ua"
      data-layout="standard"
      data-action="like"
      data-share="true"
      data-show-faces="false">
      </div>`;
      return `<span>${post.title.rendered}</span>${tmpl}`;
    };
    jQuery.fancybox.defaults.thumbs.autoStart = true;
    jQuery(document).on(this.fancyConfig);
  }
}
