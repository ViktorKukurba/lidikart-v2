import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

import { AppSettings } from '../../../constants';
import { AppDataService } from '../../../services/app-data.service';
import { selectBlogPosts } from '../../../blog/store/selectors';
import { BlogsState } from '../../store/reducers';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsComponent implements OnInit {
  blogs: Observable<[]>;
  selectedPost;
  constructor(
    private dataService: AppDataService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<BlogsState> ) { }

  ngOnInit() {
    this.route.params.pipe(filter(p => p.post), pluck('post')).subscribe((p: string) => {
      this.router.navigate([this.urlPath, p]);
    });
    this.blogs = this.store.select(selectBlogPosts);
  }

  get urlPath() {
    return `/${this.dataService.langURLPrefix}/${AppSettings.ROUTE.BLOG}`;
  }
}
