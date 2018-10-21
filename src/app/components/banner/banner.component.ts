import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  showBanner:Boolean = false;
  constructor(private router:Router, private route:ActivatedRoute) {
    router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        this.showBanner = e.state.root.firstChild.data.banner;
      }
    });
  }

  ngOnInit() {
  }

}
