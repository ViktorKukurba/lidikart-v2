import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  private pageData;
  private resume;
  private lang;
  constructor(private appData:AppDataService) {
    appData.lang.subscribe(l => {
      this.lang = l;
    })
    appData.pages.subscribe(pages => {
      this.pageData = pages.find(p => p.slug === 'about');
      this.resume = {
        link: `../documents/${this.lang}'-resume.pdf`,
        name: 'pages.resume.action'
      };
    })
  }

  ngOnInit() {
  }

}
