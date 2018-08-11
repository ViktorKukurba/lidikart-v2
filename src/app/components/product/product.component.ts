import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../../services/app-data.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  category:Object = {}
  posts:Array<Object> = []

  constructor(private route:ActivatedRoute, private dataService:AppDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getCategoryData(params.category).subscribe(response => {
        this.category = response[0];
        this.posts = response[1];
        console.log(response)
      })
    })
  }

}
