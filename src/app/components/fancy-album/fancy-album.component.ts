import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service';

declare var jQuery: any

@Component({
  selector: 'app-fancy-album',
  templateUrl: './fancy-album.component.html',
  styleUrls: ['./fancy-album.component.scss']
})
export class FancyAlbumComponent implements OnInit {
  items: Array<any> = [];
  serie: String = '';
  pic: number;
  url: String;

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.url = url.map(us => us.path).join('/');
    });

    this.route.params.subscribe(params => {
      this.serie = params.serie;
      this.pic = +params.pic;
      this.galleryService.setImagesSerie(params.serie);
      this.router.navigate([this.url, this.getOptParams()]);
    });

    this.galleryService.filteredImages.subscribe((posts:Array<any>) => {
      this.items = posts;
    });

    this.initFancyBox();
  }

  private getOptParams():Object {
    var optParams:any = {};
    if (this.serie) {
      optParams.serie = this.serie;
    }

    if (this.pic) {
      optParams.pic = this.pic;
    }
    return optParams;
  }

  private initFancyBox():void {
    jQuery.fancybox.defaults.hash = false;    
    jQuery(document).on({
      'beforeShow.fb': (e, instance, current, firstRun) => {
        this.pic = current.opts.picId;
        this.router.navigate([this.url, this.getOptParams()]);
      },
      'beforeClose.fb': () => {
        this.pic = null;
        this.router.navigate([this.url, this.getOptParams()]);
      }
    });
  }
}
