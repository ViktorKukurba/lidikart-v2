import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppDataService } from '../../services/app-data.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  pages = [];
  constructor(private dataService:AppDataService, private router: Router) { }

  navigateTo(page) {
    this.router.navigate([page])
  }

  ngOnInit() {
    this.dataService.getPageCategories().subscribe((pages) => {
      this.pages = pages;
    })
  }

}
