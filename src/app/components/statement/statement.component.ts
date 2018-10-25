import { Component } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';
import { WpPage } from '../../interfaces/wp-page';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent {
  pageData: WpPage;
  constructor(private dataService: AppDataService) {
    dataService.pages.subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'statement');
    });
  }
}
