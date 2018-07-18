import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  categories:Array<any> = []
  constructor(private galleryService: GalleryService, private route:ActivatedRoute) {
    this.galleryService.categories.subscribe(categories => {
      this.categories = categories
    })
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
