import { Routes } from '@angular/router';

import { ProductionComponent } from './components/production/production.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BiographyComponent } from './components/biography/biography.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { ExhibitionComponent } from './components/exhibition/exhibition.component';
import { StatementComponent } from './components/statement/statement.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BlogsComponent } from './components/blogs/blogs.component';

import { AppSettings } from './constants';


const ROUTES = [{
    path: '',
    component: GalleryComponent
  }, {
    path: AppSettings.ROUTE.GALLERY,
    component: GalleryComponent,
  }, {
    path: AppSettings.ROUTE.DECOR,
    component: ProductionComponent
  }, {
    path: 'about',
    component: BiographyComponent,
    data: {
      banner: true
    }
  }, {
    path: 'exhibitions',
    component: ExhibitionsComponent
  }, {
    path: 'exhibitions/:id',
    component: ExhibitionComponent
  }, {
    path: 'statement',
    component: StatementComponent,
    data: {
      banner: true
    }
  }, {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      banner: true
    }
  }, {
    path: AppSettings.ROUTE.BLOG,
    component: BlogsComponent
  }
];

const langRoutes: Routes = ROUTES.reduce((routes, route) => {
  const lRoutes = AppSettings.LANGUAGES.filter(l => l.path).map((language) => {
    const lRoute = {...route};
    lRoute.path = language.path + (language.path && lRoute.path ? '/' : '') + lRoute.path;
    return lRoute;
  });
  lRoutes.forEach(lRoute => {
    routes = routes.concat(lRoute);
  });
  return routes;
}, []);

export { langRoutes, ROUTES };
