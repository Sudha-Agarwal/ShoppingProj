import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';
import{Products} from '../products';
import{Category} from '../category';

@Component({
  selector: 'app-admin-list-product',
  templateUrl: './admin-list-product.component.html',
  styleUrls: ['./admin-list-product.component.css']
})
export class AdminListProductComponent implements OnInit {
category;
products:Products[];
categoryValue;
categoryList:Category[];
showProductData;
editProductData;
editProduct:Products;
model:any = {};

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.showProductData = false;
      this._dataService.getCategory()
      .subscribe(categoryList => {this.categoryList = categoryList;
      console.log(this.categoryList);
    });
  }

  getProductData(categoryValue){
    alert(categoryValue)
    this._dataService.getProductData(categoryValue)
      .subscribe(products => {this.products = products;
      console.log(this.products);this.showProductData=true;
    });

  }

  EditProductData(product){
    this.showProductData = false;
    this.editProductData = true;
    this.model = product;
  }

  updateProductData(){
   this._dataService.updateProductData(this.model)
   .subscribe(products=> {this.products = products;
     console.log("update");
     console.log(products);
     this.editProductData = false;
    this.showProductData = true;})}

    deleteProductData(product){
    this._dataService.deleteProductData(product.SKU,product.Category)
    .subscribe(products=>this.products = products)
  }

}
