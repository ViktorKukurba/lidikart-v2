import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      ROUTES,
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
