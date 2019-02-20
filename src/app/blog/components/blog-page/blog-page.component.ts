import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, pairwise, startWith, pluck, filter } from 'rxjs/operators';
import { routerAnimation } from '../../../animations/router.animation';
import { AppDataService } from '../../../services/app-data.service';
import { LoadBlogs } from '../../store/actions';
import { BlogsState } from '../../store/reducers';
import { selectBlogPosts } from '../../store/selectors';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss', '../../../styles/sub-navigation.scss'],
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
    private store: Store<BlogsState>,
    private router: Router,
    private route: ActivatedRoute) { }

  next: Observable<any>;
  prev: Observable<any>;

  get baseUrl() {
    return `/${this.appService.langURLPrefix}/blog`;
  }

  ngOnInit() {
    this.blogs = this.store.select(selectBlogPosts);
    this.store.dispatch(new LoadBlogs());

    const routeChangeStream = this.router.events.pipe(filter(e => e instanceof NavigationEnd));

    const currentIndex = combineLatest(this.blogs, routeChangeStream.pipe(startWith(null))).pipe(
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

    this.showNavigation = currentIndex.pipe(
      distinctUntilChanged(),
      pluck('index'),
      map(i => i > -1));

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
      startWith([0, -3]),
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
