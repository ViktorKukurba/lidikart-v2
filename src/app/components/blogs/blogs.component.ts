import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppSettings } from '../../constants';
import { AppDataService } from '../../services/app-data.service';
import { AppState, selectBlogs } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

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
    private store: Store<AppState> ) { }

  ngOnInit() {
    this.route.params.pipe(filter(p => p.post), pluck('post')).subscribe((p: string) => {
      this.router.navigate([this.urlPath, p]);
    });
    this.blogs = this.store.select(selectBlogs);
  }

  get urlPath() {
    return `/${this.dataService.langURLPrefix}/${AppSettings.ROUTE.BLOG}`;
  }
}
