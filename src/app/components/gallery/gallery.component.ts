import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service';
import { AppSettings } from '../../constants'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  categories:Array<any> = [];
  GALLERY_PATH = AppSettings.ROUTE.GALLERY;
  constructor(private galleryService: GalleryService, private route:ActivatedRoute) {
    this.galleryService.categories.subscribe((categories:Array<any>) => {
      this.categories = categories.filter(c => c.slug !== 'general');
      if (this.categories.length) {
        this.categories.unshift({
          name: 'Усе'
        });
      }
    });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   if (params.category) {
    //     this.loadCategory(params.category);
    //   } else {
    //     this.loadPageCategories()
    //   }
    // });
  }
}
