import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '../../services/gallery.service';
import { AppDataService } from '../../services/app-data.service';
import { AppSettings } from '../../constants'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit {
  categories:Array<any> = [];
  pictures = [];
  albumState:{pic?:string} = {};
  private lang_;
  private serie_;
  @ViewChild('filter')
  private navifation;
  private top_;
  GALLERY_PATH = AppSettings.ROUTE.GALLERY;
  constructor(
    private galleryService: GalleryService,
    private appService: AppDataService,
    private route:ActivatedRoute) {

    this.galleryService.galleryCategories.subscribe((categories:Array<any>) => {
      this.categories = categories.filter(c => c.slug !== 'general' && !(c.slug && c.slug.includes('-no-show')));
    });

    this.galleryService.filteredImages.subscribe((posts:Array<any>) => {
      this.pictures = posts;
    });

    // this.appService.lang.subscribe(lang => {
    //   this.lang_ = lang;
    // })

    this.route.params.subscribe(params => {
      this.albumState = params;
      this.serie_ = Number(params.serie);
      this.galleryService.setImagesSerie(params.serie);
    });

    window.addEventListener('scroll', evt => {
      var pageY = window.pageYOffset || document.documentElement.scrollTop,
          nav = this.navifation.nativeElement;

      if (pageY >= this.top_) {
        nav.classList.add('fixed');
      } else {
        nav.classList.remove('fixed');
      }
    })
  }

  ngAfterViewInit() {
    this.top_ = this.navifation.nativeElement.getBoundingClientRect().top;
  }

  get urlPath() {
    return `/${this.appService.langURLPrefix}/${this.GALLERY_PATH}`;
  }
}
