import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppDataService } from './services/app-data.service';
import { GalleryService } from './services/gallery.service';
import { GalleryComponent } from './components/gallery/gallery.component';


import 'hammerjs';
import { ProductionComponent } from './components/production/production.component';
import { ROUTES } from './app.routes';

import { AppInterceptor } from './app.interceptor';

import { FancyAlbumComponent } from './components/fancy-album/fancy-album.component';
import { FooterComponent } from './components/footer/footer.component';
import { BiographyComponent } from './components/biography/biography.component';
import { BannerComponent } from './components/banner/banner.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { ImgLoaderDirective } from './directives/img-loader.directive';
import { ExhibitionComponent } from './components/exhibition/exhibition.component';
import { StatementComponent } from './components/statement/statement.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TranslateModule } from '@ngx-translate/core';

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
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(
        ROUTES,
        // {enableTracing: true} // <-- debugging purposes only
    ),
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  exports: [TranslateModule],
  providers: [AppDataService, GalleryService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true,
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
