import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { HttpClientModule } from '@angular/common/http';

import { AppDataService } from './services/app-data.service';
import { GalleryService } from './services/gallery.service';
import { GalleryComponent } from './components/gallery/gallery.component';

import { RouterModule } from '@angular/router';

import 'hammerjs';
import { ProductionComponent } from './components/production/production.component';
import { ProductComponent } from './components/product/product.component';
import { AlbumComponent } from './components/album/album.component';
import { ROUTES } from './app.routes'

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { FancyAlbumComponent } from './components/fancy-album/fancy-album.component';
import { FooterComponent } from './components/footer/footer.component';
import { BiographyComponent } from './components/biography/biography.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    ProductionComponent,
    ProductComponent,
    AlbumComponent,
    FancyAlbumComponent,
    FooterComponent,
    BiographyComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    // GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule,
    RouterModule.forRoot(
        ROUTES,
        // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [AppDataService, GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
