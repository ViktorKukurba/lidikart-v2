import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service'

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  pageData;
  constructor(private dataService:AppDataService) {
    dataService.pages.subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'statement');
    })
  }

  ngOnInit() {
  }

}
