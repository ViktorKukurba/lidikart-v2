import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { blogsReducer } from './store/reducers';
import { BlogsEffects } from './store/effects';
import { BlogRoutingModule } from './routing/blog-routing.module';

import { BlogComponent } from './components/blog/blog.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { PostComponent } from './components/post/post.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  declarations: [
    BlogPageComponent,
    BlogsComponent,
    BlogComponent,
    PostComponent,
  ],
  imports: [
    AppCommonModule,
    CommonModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('blogFeature', blogsReducer),
    EffectsModule.forFeature([BlogsEffects]),
    BlogRoutingModule
  ],
  exports: [BlogRoutingModule]
})
export class BlogModule { }
