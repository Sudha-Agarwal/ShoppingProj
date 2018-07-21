import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import{Products} from '../products';
import {DataService} from '../data.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
SKU;
product:Products;

  constructor(private route: ActivatedRoute,private _dataService: DataService) {
    this.SKU = this.route.snapshot.params.SKU;
  }

  ngOnInit() {    
    this._dataService.getProductDetails(this.SKU)
      .subscribe(products => {this.product = products;
      console.log(this.product);});   
  }

}
