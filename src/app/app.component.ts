import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import { langRoutes } from './app.routes';
import { AppDataService } from './services/app-data.service';
import { routerAnimation } from './animations/router.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/fonts.css', './app.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition('* <=> *', useAnimation(routerAnimation))
  ])]
})
export class AppComponent implements OnInit {
  private prevPage;
  private pages;
  @ViewChild('header')
  private header;
  @ViewChild('banner', {read: ElementRef})
  private banner;
  @ViewChild('banner')
  private bannerComponent;
  @ViewChild('footer')
  private footer;
  contentHeight:string|number = 0;
  constructor(private router: Router, private dataService: AppDataService, private route: ActivatedRoute) {
    const resizeStream = fromEvent(window, 'resize');
    const routeChangeStream = router.events.pipe(filter(e => e instanceof NavigationEnd));
    merge(resizeStream, routeChangeStream).subscribe(e => {
      setTimeout(() => this.setContentHeight());
    });
    router.config.unshift(...langRoutes);
    dataService.pages.subscribe((pages:Array<any>) => {
      this.pages = pages.reduce((pages, {slug, menu_order}) => {
        pages[slug] = menu_order;
        return pages;
      }, {});
    });
  }

  ngOnInit() {
    this.setContentHeight();
  }

  getState(outlet) {
    const path = outlet.activatedRoute.snapshot.routeConfig.path;
    const langPrefix = this.dataService.langURLPrefix;
    const newPage = langPrefix ? path.replace(`${langPrefix}/`, '') : path;
    const isNext = this.prevPage <= this.pages[newPage];
    this.prevPage = this.pages[newPage];
    return {
      value: newPage,
      params: {
        offsetEnter: isNext ? 100 : -100,
        offsetLeave: isNext ? -100: 100
      }
    };
  }

  private getHeight(...args) {
    return args.reduce((sum, el) => {
      return sum + el.nativeElement.offsetHeight
    }, 0)
  }

  private setContentHeight() {
    console.log('111', this.getHeight(this.footer, this.header), this.bannerComponent.height, window.innerHeight)
    this.contentHeight = window.innerHeight - this.getHeight(this.footer, this.header) - this.bannerComponent.height + 'px';
  }
}
