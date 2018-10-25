import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service';
import { AppDataService } from '../../services/app-data.service';
import Utils from '../../utils';
import { WpPost } from '../../interfaces/wp-post';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss']
})
export class ExhibitionComponent {
  pictures = [];
  categoryId: number;
  exhibition;
  pic;
  constructor(
    private dataService: AppDataService,
    private galleryService: GalleryService,
    private route: ActivatedRoute) {
      route.params.subscribe(p => {
        this.pic = p.pic;
        this.categoryId = Number(p.id);
        dataService.setCategory(this.categoryId);
      });

      dataService.categories.subscribe(categories => {
        if (this.categoryId && categories.length) {
          this.exhibition = categories.find(c => c.id === this.categoryId);
          this.exhibition.description = Utils.translate(this.exhibition.description, dataService.langValue);
        }
      });
      dataService.posts.subscribe((posts: Array<WpPost>) => {
        this.pictures = GalleryService.formatPosts(posts, this.categoryId);
      });
  }
}
