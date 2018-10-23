import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  pageData;
  resume;
  constructor(private appData:AppDataService) {
    appData.pages.subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'about');
      this.resume = {
        link: `../documents/${appData.langValue}'-resume.pdf`,
        name: 'pages.resume.action'
      };
    })
  }

  ngOnInit() {
  }

}
