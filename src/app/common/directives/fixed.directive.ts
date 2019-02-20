import { Directive, HostBinding, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFixed]'
})
export class FixedDirective implements AfterViewInit, OnDestroy {

  @HostBinding('class.fixed')
  private fixed = false;

  private sub: Subscription;

  constructor(private appService: AppDataService, private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.sub = this.appService.isElementTop(this.el.nativeElement).subscribe(isTop => {
      this.fixed = !isTop;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
