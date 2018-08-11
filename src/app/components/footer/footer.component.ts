import { Component, OnInit } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dataService:AppDataService) { }

  ngOnInit() {
  }

}
