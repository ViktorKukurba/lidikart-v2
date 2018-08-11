import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service'

const PAGE = 'production';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  categories:Array<Object> = []
  constructor(private dataService:AppDataService) { }

  ngOnInit() {
    this.dataService.getPageCategories().subscribe(pages => {
      this.categories = pages.filter((page) => page.slug === PAGE)[0].categories[PAGE];
    })
  }

}
