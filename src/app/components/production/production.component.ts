import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AppDataService } from '../../services/app-data.service';
import { GalleryService } from '../../services/gallery.service';

const PAGE = 'production';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  categories:Array<Object> = [];
  posts = [];

  private albumState;
  constructor(private dataService:AppDataService,
    private galleryService:GalleryService,
    private route: ActivatedRoute) {
      galleryService.wallCategories.subscribe(categories => {
        var ids = <Array<string|number>>categories.map(category => {
          return <string|number>category.id;
        }).filter(id => Boolean(id));
        ids.length && this.dataService.getPostsByCategories(ids).subscribe(response => {
          this.posts = response.map(p => galleryService.toImageItem(p));
      })

      route.params.subscribe(params => {
        this.albumState = params;
      });
    })
  }
}
