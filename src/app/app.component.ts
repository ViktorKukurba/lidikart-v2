import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, forkJoin, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import { langRoutes } from './app.routes';
import { AppDataService } from './services/app-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/fonts.css', './app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild('header')
  private header;
  @ViewChild('banner', {read: ElementRef})
  private banner:ElementRef;
  @ViewChild('footer')
  private footer;
  contentHeight:string|number = 0;
  constructor(private router: Router, private translate:TranslateService, private dataService: AppDataService) {
    translate.setDefaultLang(dataService.langValue);
    this.setTranslations();
    const resizeStream = fromEvent(window, 'resize');
    const routeChangeStream = router.events.pipe(filter(e => e instanceof NavigationEnd));
    merge(resizeStream, routeChangeStream).subscribe(e => {
      setTimeout(() => this.setContentHeight());
    });
    router.config.unshift(...langRoutes);
  }

  ngOnInit() {
    this.setContentHeight();
  }

  private setTranslations() {
    this.translate.setTranslation('en', {
      Title: 'another world',
      Contact: 'Contact',
      JoinSocial: 'Join us' 
    });
    this.translate.setTranslation('ua', {
      Title: 'інший світ',
      Contact: 'Контакти',
      JoinSocial: 'Приєднуйтесь' 
    });
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
