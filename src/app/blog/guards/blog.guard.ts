import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, first } from 'rxjs/operators';
import { WpService } from '../../services/wp.service';
import { selectBlogPost } from '../store/selectors';
import { BlogsState } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class BlogGuard implements CanActivate, Resolve<Observable<any>> {
  constructor(private store: Store<BlogsState>, private router: Router, private wp: WpService) {}
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
      select(selectBlogPost, id),
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
