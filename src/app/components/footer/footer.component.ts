import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  pages:Array<Object>;
  constructor(private dataService:AppDataService) {
    dataService.pages.subscribe(pages => {
      this.pages = pages;
    })
  }
}
