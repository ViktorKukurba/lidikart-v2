import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppSettings } from '../../constants';
import { AppDataService } from '../../services/app-data.service';
import { AppState, selectBlogs } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadBlogs } from '../../store/actions/blogs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: Observable<[]>;
  selectedPost;
  constructor(
    private dataService: AppDataService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.dispatch(new LoadBlogs());
    this.blogs = this.store.select(selectBlogs);
    this.selectedPost = Number(this.route.snapshot.params.post);
    this.route.params.subscribe(params => {
      this.selectedPost = +params.post;
    });
  }

  get urlPath() {
    return `/${this.dataService.langURLPrefix}/${AppSettings.ROUTE.BLOG}`;
  }

  selectPost({selected, post}) {
    if (selected) {
      this.router.navigate([this.urlPath, {post}]);
    } else {
      this.router.navigate([this.urlPath]);
    }
  }
}
