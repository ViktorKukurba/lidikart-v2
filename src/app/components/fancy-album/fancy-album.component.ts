import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppSettings } from '../../constants'

declare var jQuery: any

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
  serie: String = '';
  url: String;
  routeParams;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.url = url.map(us => us.path).join('/');
    });

    this.route.params.subscribe(params => {
      this.routeParams = {...params};
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
    jQuery(document).on({
      'beforeShow.fb': (e, instance, current, firstRun) => {
        this.pic = current.opts.picId;
        this.routeParams.pic = this.pic;
        this.router.navigate([this.url || AppSettings.ROUTE.GALLERY, this.routeParams]);
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
