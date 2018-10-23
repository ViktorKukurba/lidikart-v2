import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import { langRoutes } from './app.routes';
import { AppDataService } from './services/app-data.service';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/fonts.css', './app.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'absolute', width:'100%' })
          , { optional: true }),
        /* 2 */ group([  // block executes in parallel
          query(':enter', [
            style({ transform: 'translateX({{offsetEnter}}%)', opacity: 0 }),
            animate('0.4s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)', opacity: 1 }),
            animate('0.4s ease-in-out', style({ transform: 'translateX({{offsetLeave}}%)', opacity: 0}))
          ], { optional: true }),
        ])
      ])
  ])]
})
export class AppComponent implements OnInit {
  private prevPage;
  private pages;
  @ViewChild('header')
  private header;
  @ViewChild('banner', {read: ElementRef})
  private banner:ElementRef;
  @ViewChild('footer')
  private footer;
  contentHeight:string|number = 0;
  constructor(private router: Router, private translate:TranslateService, private dataService: AppDataService) {
    // translate.setDefaultLang(dataService.langValue);
    // this.setTranslations();
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
    this.contentHeight = window.innerHeight - this.getHeight(this.footer, this.header, this.banner) + 'px';
  }
}
