import { Component, OnInit, ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  pageData;
  resumeLink:string;
  constructor(private appData: AppDataService, private element: ElementRef) {
    appData.pages.pipe(filter(pages => Boolean(pages.length))).subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'about');
      this.resumeLink = this.pageData.acf[`resume_${appData.langValue}`].url;
    })
  }

  ngOnInit() {
    (<any>window).FB.XFBML.parse(this.element.nativeElement);
  }
}
