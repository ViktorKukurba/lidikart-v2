import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Router, ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../services/gallery.service'
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  inputs:['posts']
})
export class AlbumComponent implements OnInit {
  @Input() posts:Array<any> = [];
  items: GalleryItem[];
  category: number;
  pic: number;


  constructor(
      public gallery: Gallery,
      public lightbox: Lightbox,
      private galleryService: GalleryService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    console.log('ngOnInitngOnInit')
    combineLatest(this.route.params, this.galleryService.posts).subscribe(res => {
      var params = res[0];
      console.log('combineLatest', params)
      this.pic = params.pic;
      if (this.category != params.category || this.category === undefined) {
        this.loadGallery();
        if (this.pic && this.items.length) {
          this.openGallery(this.pic)
        }
        // this.pic = undefined;
      }
      this.category = params.category;
    })

    this.gallery.ref('lightbox').indexChanged().subscribe(item => {
      const ID = item.items[item.currIndex].post.id;
      const url = this.category ? `gallery/${this.category}` : `gallery`;
      console.log('router.navigate')
      this.router.navigate([url, {pic: ID}]);
    })

    document.body.addEventListener('click', e => {
      if (e.target['classList'].contains('g-btn-close')) {
        const url = this.category ? `gallery/${this.category}` : 'gallery';
        this.router.navigate([url]);
      }
    })
  }

  openGallery(id, i=this.getIndexById(id)) {
    const url = this.category ? `gallery/${this.category}` : `gallery`;
    this.router.navigate([url, {pic: id}]);
    this.lightbox.open(i, 'lightbox', {
      panelClass: 'fullscreen'
    });
  }

  private getIndexById(id) {
    return this.items.indexOf(this.items.find(i => i['post'].id === +id))
  }

  private loadGallery() {
    this.items = this.galleryService.getCategoryImages(this.category)
    this.gallery.ref('lightbox').load(this.items);
  }
}
