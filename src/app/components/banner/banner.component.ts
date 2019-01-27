import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  show$: Observable<Boolean>;
  constructor(private router: Router) {
    this.show$ = this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      map((e: RoutesRecognized) => Boolean(e.state.root.firstChild.data.banner)));
  }
}
