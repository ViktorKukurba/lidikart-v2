import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState, selectRouteData } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  show$: Observable<Boolean>;
  constructor(private store: Store<AppState>) {
    this.show$ = this.store.select(selectRouteData).pipe(map(e => Boolean(e.banner)));
  }
}
