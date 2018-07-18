import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { HttpModule } from '@angular/http'

import { AppDataService } from './services/app-data.service';
import { GalleryService } from './services/gallery.service';
import { GalleryComponent } from './components/gallery/gallery.component';

import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';
import { ProductionComponent } from './components/production/production.component';
import { ProductComponent } from './components/product/product.component';
// import { galleryConfig } from './gallery.config';
import { AlbumComponent } from './components/album/album.component'

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';

const appRoutes:Routes = [{
  path: 'gallery',
  component: GalleryComponent,
  children: [{
    path: '',
    component: AlbumComponent,
    children:[{
      path: ':category',
      children: []
    },
    //   {
    //   path: 'serie/:category',
    //   children: []
    // }, {
    //   path: 'serie/:category/pic/:pic',
    //   children: []
    // }
    ]
  }]
}, {
  path: 'production',
  component: ProductionComponent
}, {
  path: 'production/:category',
  component: ProductComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GalleryComponent,
    ProductionComponent,
    ProductComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    // GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule,
    RouterModule.forRoot(
        appRoutes,
        // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [AppDataService, GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
