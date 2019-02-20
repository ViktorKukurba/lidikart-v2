import { BlogsComponent } from '../components/blogs/blogs.component';
import { BlogComponent } from '../components/blog/blog.component';
import { BlogPageComponent } from '../components/blog-page/blog-page.component';

import { BlogGuard } from '../guards/blog.guard';

export const ROUTES = [{
  path: '',
  component: BlogPageComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    component: BlogsComponent,
  },
  {
    path: ':id',
    component: BlogComponent,
    data: {
      reuse: false
    },
    resolve: {
      blog: BlogGuard
    },
    canActivate: [BlogGuard]
  }]
}];
