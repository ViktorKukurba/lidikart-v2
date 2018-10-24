import { Component, OnInit } from '@angular/core';

import { Router, RoutesRecognized } from '@angular/router'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  show:Boolean = false;
  constructor(private router:Router) {
    router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        this.show = Boolean(e.state.root.firstChild.data.banner);
      }
    });
  }

  get height() {
    return this.show ? 101 : 1;
  }

  ngOnInit() {
  }
}
