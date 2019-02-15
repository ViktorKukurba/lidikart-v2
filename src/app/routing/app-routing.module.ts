import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { ROUTES } from './app.routes';
import { CustomReuseStrategy } from './route-reuse-strategy';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      ROUTES,
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomReuseStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
