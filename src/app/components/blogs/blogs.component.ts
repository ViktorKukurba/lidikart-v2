import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppSettings } from '../../constants';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs = [];
  selectedPost;
  constructor(private dataService: AppDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.blogs.subscribe(blogs => {
      this.blogs = blogs;
    });
    this.selectedPost = Number(this.route.snapshot.params.post);
    this.route.params.subscribe(params => {
      this.selectedPost = +params.post;
    })
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
