import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {

  exhibitions = [];
  pageData;

  constructor(private dataService: AppDataService) { }

  ngOnInit() {
    this.dataService.pages.subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'exhibitions');
      if (this.pageData) {
        this.exhibitions = this.pageData.categoriesMap.exhibitions;
      }
    });
  }
}
