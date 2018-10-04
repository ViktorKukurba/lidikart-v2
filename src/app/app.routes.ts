import { Routes } from '@angular/router';

import { ProductionComponent } from './components/production/production.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BiographyComponent } from './components/biography/biography.component'
import { AppSettings } from './constants';


const ROUTES = [{
    path: '',
    component: GalleryComponent,
  }, {
    path: AppSettings.ROUTE.GALLERY,
    component: GalleryComponent,
  }, {
    path: 'decor',
    component: ProductionComponent
  }, {
    path: 'about',
    component: BiographyComponent,
    data: {
      banner: true
    }
  }
];

const langRoutes:Routes = ROUTES.reduce((routes, route) => {
  var lRoutes = AppSettings.LANGUAGES.filter(l => l.path).map((language) => {
    var lRoute = {...route};
    lRoute.path = language.path + (language.path && lRoute.path ? '/' : '') + lRoute.path
    return lRoute;
  });
  lRoutes.forEach(lRoute => {routes = routes.concat(lRoute)});
  return routes;
}, []);

export { langRoutes, ROUTES };