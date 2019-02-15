import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBlog } from '../store/reducers';
import { switchMap, first } from 'rxjs/operators';
import { WpService } from '../services/wp.service';

@Injectable({
  providedIn: 'root'
})
export class BlogGuard implements CanActivate, Resolve<Observable<any>> {
  constructor(private store: Store<AppState>, private router: Router, private wp: WpService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return isFinite(Number(next.paramMap.get('id')));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    if (!isFinite(id)) {
      this.router.navigate(['/blog']);
      return EMPTY;
    }

    return this.store.pipe(
      select(selectBlog, id),
      first(),
      switchMap(blog => {
        if (blog) {
          return of(blog);
        } else {
          return this.wp.loadBlog(id).pipe(
            switchMap(loadedBlog => {
              if (loadedBlog) {
                return of(loadedBlog);
              } else {
                this.router.navigate(['/']);
                return EMPTY;
              }
            }));
        }
      })
    );
  }
}
