import { Component, OnInit, Input, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { FacebookService, InitParams } from 'ngx-facebook';

import { AppSettings } from '../../constants';

import { DomService } from '../../services/dom.service';

declare var jQuery: any

@Component({
  selector: 'fb-wrapper',
  template: `<div href="https://github.com/zyra/ngx-facebook"></div>`,
})
export class FbWrapperComponent { }

@Component({
  selector: 'app-fancy-album',
  templateUrl: './fancy-album.component.html',
  styleUrls: ['./fancy-album.component.scss']
})
export class FancyAlbumComponent implements OnInit {
  @Input()
  items: Array<any> = [];
  @Input()
  pic:number;
  url: String;
  routeParams;
  @ViewChild(TemplateRef)
  like:TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewContainer: ViewContainerRef,
    private domService: DomService,
  ) { }

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

    this.initFancyBox();
    this.openPic();
  }

  private openPic() {
    if (this.pic) {
      const click = () => {
        if (this.items.length) {
          jQuery(`[data-pic-id="${this.pic}"]`).click();
        } else {
          setTimeout(click, 1e1);
        }
      }
      click();
    }
  }

  private initFancyBox():void {
    jQuery.fancybox.defaults.hash = false;
    jQuery.fancybox.defaults.caption = ( instance, item ) => {
      var id = item.opts.picId;
      if (typeof id === 'string') {
        id = +id.replace('pic-', '');
      }
      const post = this.items.find(i => i.post.id === id).post;
      const tmpl = `<div class="fb-like" 
        data-href="https://lidikart.com.ua/picture/${id}" 
        data-layout="standard" 
        data-action="like"
        data-show-faces="false">
      </div>`;
      return `<span>${post.title.rendered}</span>${tmpl}`;
    }
    jQuery.fancybox.defaults.thumbs.autoStart = true; 
    jQuery(document).on({
      'beforeShow.fb': (e, instance, current, firstRun) => {
        this.pic = current.opts.picId;
        this.routeParams.pic = this.pic;
        this.router.navigate([this.url || AppSettings.ROUTE.GALLERY, this.routeParams]);
      },
      'beforeLoad.fb': () => {
        (<any>window).FB.XFBML.parse(document.getElementById(`fb-like-${this.pic}`));
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
    });
  }
}
