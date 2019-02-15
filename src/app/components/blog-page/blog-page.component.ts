import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { routerAnimation } from '../../animations/router.animation';
import { AppDataService } from '../../services/app-data.service';
import { Store } from '@ngrx/store';
import { AppState, selectBlogs, selectRouterInfo } from '../../store/reducers';
import { LoadBlogs } from '../../store/actions/blogs';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';
import { map, distinctUntilChanged, pairwise, startWith, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss', '../../styles/sub-navigation.scss'],
  animations: [
    trigger('pagesAnimation', [
      transition('* <=> *', useAnimation(routerAnimation))
  ])]
})
export class BlogPageComponent implements OnInit {

  private blogs: Observable<any[]>;

  showNavigation: Observable<boolean>;
  routeState: Observable<any>;

  constructor(private appService: AppDataService,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  next: Observable<any>;
  prev: Observable<any>;

  get baseUrl() {
    return `/${this.appService.langURLPrefix}/blog`;
  }

  ngOnInit() {
    this.blogs = this.store.select(selectBlogs);
    this.store.dispatch(new LoadBlogs());
    const routeInfo = this.store.select(selectRouterInfo);
    this.showNavigation = routeInfo.pipe(
      map(({route}) => route.component === BlogComponent),
      distinctUntilChanged());

    const currentIndex = combineLatest(this.blogs, routeInfo, this.route.url).pipe(
      map(([blogs]) => {
        const blog = this.route.snapshot.firstChild.data.blog;
        if (!blog) {
          return {
            index: -2,
            blogs
          };
        }
        return {index: blogs.map(b => b.id).indexOf(blog.id), blogs};
      }));

    this.next = currentIndex.pipe(map(({index, blogs}) => {
      if (index !== 0) {
        return blogs[index - 1];
      }
    }));

    this.prev = currentIndex.pipe(map(({index, blogs}) => {
      if (blogs.length > index + 1) {
        return blogs[index + 1];
      }
    }));

    this.routeState = currentIndex.pipe(
      pluck('index'),
      distinctUntilChanged(),
      pairwise(),
      startWith([-3, -3]),
      map(([prev, next]) => {
        const diff = next < prev;
        return {
          value: next,
          params: {
            offsetEnter: diff ? -100 : 100,
            offsetLeave: diff ? 100 : -100
          }
        };
      }));
  }
}
