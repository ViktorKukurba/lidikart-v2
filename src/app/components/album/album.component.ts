import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Gallery, GalleryRef, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service';
import { AppSettings } from '../../constants';
import { LAGalleryItem } from '../../types';

const GALLERY_PATH = AppSettings.ROUTE.GALLERY;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  inputs:['posts']
})
export class AlbumComponent implements OnInit {
  @Input() posts:Array<any> = [];
  items: LAGalleryItem[];
  category: number;
  pic: number;
  galleryRef: GalleryRef;

  constructor(
      public gallery: Gallery,
      public lightbox: Lightbox,
      private galleryService: GalleryService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.galleryRef = this.gallery.ref('lightbox');
    const params = this.route.params['value'];
    this.route.params.subscribe(params => {
      this.galleryService.setImagesSerie(params.serie);
    });

    this.galleryService.filteredImages.subscribe((posts:LAGalleryItem[]) => {
      this.items = posts;
      this.galleryRef.load(this.items);
    });

    this.galleryRef.indexChanged.subscribe(item => {
      this.pic = (<LAGalleryItem>item.items[item.currIndex]).post.id;
      this.router.navigate([GALLERY_PATH, this.getOptParams()]);
    });

    setTimeout(() => {
      if (params.pic) {
        this.openGallery(params.pic);
      }
    });

    function hasParent(el:Node, cssClass, index = 3) {
      if (el['classList'].contains(cssClass)) {
        return true;
      }

      if (index === 0 || !el.parentNode) {
        return false;
      }
      return hasParent(el.parentNode, cssClass, index - 1);
    }

    document.body.addEventListener('click', e => {
      if (hasParent(<Node>e.target, 'g-btn-close')) {
        this.pic = null;
        this.router.navigate([GALLERY_PATH, this.getOptParams()]);
      }
    })
  }

  openGallery(id, i=this.getIndexById(id)) {
    this.pic = id;
    this.router.navigate([`/${GALLERY_PATH}`, this.getOptParams()]);
  }

  private getOptParams():Object {
    var optParams:any = {};
    if (this.pic) {
      optParams.pic = this.pic;
    }

    if (this.category) {
      optParams.serie = this.category;
    }
    return optParams;
  }

  private getIndexById(id) {
    return this.items.indexOf(this.items.find(i => i['post'].id === +id))
  }

  // private loadGallery() {
  //   console.log('loadGallery', this.category);
  //   this.items = this.galleryService.getCategoryImages(this.category);
  //   this.galleryService.filteredPosts.subscribe((posts) => {
  //     console.log('filtered test', posts);
  //   });
  //   this.galleryRef.load(this.items);
  // }
}
