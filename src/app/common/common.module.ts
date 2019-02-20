import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedDirective } from './directives/fixed.directive';
import { ImgLoaderDirective } from './directives/img-loader.directive';
import { ImgUrlPipe } from './pipes/img-url.pipe';

@NgModule({
  declarations: [
    FixedDirective,
    ImgLoaderDirective,
    ImgUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FixedDirective,
    ImgLoaderDirective,
    ImgUrlPipe
  ]
})
export class AppCommonModule { }
