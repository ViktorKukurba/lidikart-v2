import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouteReuseStrategy, PreloadAllModules } from '@angular/router';

import { CustomReuseStrategy } from './route-reuse-strategy';
import { ROUTES } from './app.routes';
import { multilangRoutes } from '../utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules})
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomReuseStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.config.unshift(...multilangRoutes(ROUTES));
  }
}
