import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fromEvent, merge, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { langRoutes } from './routing/app.routes';
import { AppDataService } from './services/app-data.service';
import { routerAnimation } from './animations/router.animation';
import { selectPages, AppState, selectRouteData } from './store/reducers';
import { LoadPages } from './store/actions/pages';
import { LoadCategories } from './store/actions/categories';
import { AppSettings } from './constants';
import { DismissErrorAction } from './store/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/fonts.css', './app.component.scss'],
  animations: [
    trigger('pagesAnimation', [
      transition('* <=> *', useAnimation(routerAnimation))
  ])]
})
export class AppComponent implements OnInit {
  errorList$: Observable<string[]>;
  private prevPage;
  private pagesOrderMap = {};
  @ViewChild('header')
  private header;
  @ViewChild('footer')
  private footer;
  contentHeight: string|number = 0;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private appService: AppDataService) {}

  ngOnInit() {
    this.dispatchLoad();
    this.appService.translate.onLangChange.subscribe(this.dispatchLoad.bind(this));
    this.errorList$ = this.store.select('errorList');
    const resizeStream = fromEvent(window, 'resize');
    const routeChangeStream = this.router.events.pipe(filter(e => e instanceof NavigationEnd));
    merge(resizeStream, routeChangeStream).pipe(
    switchMap((): Observable<any> => this.store.select(selectRouteData))).subscribe(data => {
      setTimeout(() => this.setContentHeight(data.banner));
    });
    this.store.pipe(select(selectPages), map(p => p.reduce((pages, {slug, menu_order}) => {
       pages[slug] = menu_order;
       return pages;
      }, {}))).subscribe(orderMap => {
        this.pagesOrderMap = orderMap;
      });
    this.router.config.unshift(...langRoutes);
  }

  private dispatchLoad() {
    this.store.dispatch(new LoadPages());
    this.store.dispatch(new LoadCategories());
  }

  getState(outlet) {
    if (outlet.activated) {
      const path = outlet.activatedRoute.snapshot.routeConfig.path;
      const langPrefix = this.appService.langURLPrefix;
      let newPage = langPrefix ? path.replace(`${langPrefix}/`, '') : path;
      if (!this.pagesOrderMap[newPage]) {
        newPage = AppSettings.ROUTE.GALLERY;
      }
      const isNext = this.prevPage <= this.pagesOrderMap[newPage];
      this.prevPage = this.pagesOrderMap[newPage];
      return {
        value: newPage,
        params: {
          offsetEnter: isNext ? 100 : -100,
          offsetLeave: isNext ? -100 : 100
        }
      };
    }
  }

  dismissError(error: string) {
    this.store.dispatch(new DismissErrorAction(error));
  }

  private getHeight(...args) {
    return args.reduce((sum, el) => {
      return sum + el.nativeElement.offsetHeight;
    }, 0);
  }

  private setContentHeight(showBanner = false) {
    const inPage = [this.header];
    if (showBanner) {
      inPage.push(this.footer);
    }
    this.contentHeight = window.innerHeight - this.getHeight(...inPage) -
    (showBanner ? 101 : 1) + 'px';
  }
}
