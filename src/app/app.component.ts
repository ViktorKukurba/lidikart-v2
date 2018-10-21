import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// import { FacebookService, InitParams } from 'ngx-facebook';

import { langRoutes } from './app.routes'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/fonts.css', './app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild('header')
  private header;
  @ViewChild('footer')
  private footer;
  contentHeight:string|number = 0;
  constructor(private router: Router, private container: ElementRef,
    // private fb: FacebookService
    ) {
    // const initParams: InitParams = {
    //   appId: '237271143059295',
    //   xfbml: true,
    //   version: 'v2.8'
    // };
 
    // fb.init(initParams);
    router.config.unshift(...langRoutes);
  }

  ngOnInit() {
    this.setContentHeight();

    window.addEventListener('resize', () => {
      this.setContentHeight();
    })
  }

  private setContentHeight() {
    const h = this.footer.nativeElement.offsetHeight + this.header.nativeElement.offsetHeight;
    this.contentHeight = window.innerHeight - h + 'px';
  }
}
