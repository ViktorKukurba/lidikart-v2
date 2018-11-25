import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  show = false;
  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof RoutesRecognized)).subscribe((e: RoutesRecognized) => {
      this.show = Boolean(e.state.root.firstChild.data.banner);
    });
  }

  get height() {
    return this.show ? 101 : 1;
  }
}
