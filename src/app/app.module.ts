import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { reducers } from './store/reducers';
import { PagesEffects, CategoriesEffects, BlogsEffects, PostsEffects } from './store/effects';

import { AppDataService } from './services/app-data.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { CachingInterceptor } from './interceptors/caching.interceptor';

import { GalleryComponent } from './components/gallery/gallery.component';
import { ProductionComponent } from './components/production/production.component';
import { FancyAlbumComponent } from './components/fancy-album/fancy-album.component';
import { FooterComponent } from './components/footer/footer.component';
import { BiographyComponent } from './components/biography/biography.component';
import { BannerComponent } from './components/banner/banner.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { ImgLoaderDirective } from './directives/img-loader.directive';
import { ExhibitionComponent } from './components/exhibition/exhibition.component';
import { StatementComponent } from './components/statement/statement.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { PostComponent } from './components/post/post.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    ProductionComponent,
    FancyAlbumComponent,
    FooterComponent,
    BiographyComponent,
    BannerComponent,
    ExhibitionsComponent,
    ImgLoaderDirective,
    ExhibitionComponent,
    StatementComponent,
    ContactsComponent,
    BlogsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({...reducers}),
    EffectsModule.forRoot([PagesEffects, CategoriesEffects, BlogsEffects, PostsEffects]),
    TranslateModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule,
  ],
  exports: [TranslateModule],
  providers: [AppDataService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true, }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
