import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AppDataService } from '../../services/app-data.service';
import { GalleryService } from '../../services/gallery.service';

const PAGE = 'production';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnDestroy {
  categories:Array<Object> = [];
  posts = [];
  private sub;
  public albumState;
  constructor(private dataService:AppDataService,
    private galleryService:GalleryService,
    private route: ActivatedRoute) {
      this.sub = galleryService.wallCategories.subscribe(categories => {
        var ids = <Array<string|number>>categories.map(category => {
          return <string|number>category.id;
        }).filter(id => Boolean(id));
        ids.length && this.dataService.getPostsByCategories(ids).subscribe(response => {
          this.posts = response.map(p => GalleryService.toImageItem(p));
      })

      route.params.subscribe(params => {
        this.albumState = params;
      });
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
