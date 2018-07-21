import { Component, OnInit } from '@angular/core';
import{Products} from '../products';
import{DataService} from '../data.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-womenfashion',
  templateUrl: './womenfashion.component.html',
  styleUrls: ['./womenfashion.component.css']
})
export class WomenfashionComponent implements OnInit {
  products:Products[];
  Category:String;
  message;

  constructor(private _dataService: DataService) {
    this.Category = "Women Fashion";
   }


  ngOnInit() {
     this._dataService.getProductData(this.Category)
      .subscribe(products => {this.products = products;
      console.log(this.products);
    });
    
    

  }

}
