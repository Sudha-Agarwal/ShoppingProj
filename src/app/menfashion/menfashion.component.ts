import { Component, OnInit } from '@angular/core';
import{Products} from '../products';
import{DataService} from '../data.service';
import {BehaviorSubjectService} from '../behavior-subject.service';
import {Observable} from "rxjs/Observable";
import {Cart} from '../cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menfashion',
  templateUrl: './menfashion.component.html',
  styleUrls: ['./menfashion.component.css'],
  providers: [DataService]
})
export class MenfashionComponent implements OnInit{
products:Products[];
cart:Cart[];
Category:String;
add_to_cart;
message:string;
sub;

constructor(private _dataService: DataService,private router: Router, private _BehaviorSubjectService:BehaviorSubjectService ) { 
  this.Category = "Men Fashion";
} 

subData(){  
  this._BehaviorSubjectService.setMessage(this.sub);
}

addToCart(product){
  
  if(localStorage.getItem("currentUserName") == undefined){
    alert("Please login first");
    this.router.navigate(['/home']);

  }
  else{
  console.log(product);  
    this._dataService.addItemsToCart(localStorage.getItem("currentUserName"),product.SKU,1,product.Price)
    .subscribe(cart=>{      
      this.cart = cart;          
      this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).subscribe(
        cart=> {
          this._BehaviorSubjectService.CartQuantity(cart[0].Quantity);  
        }
      );     
      
    },
    error=>{
      console.log(error);
    });
}
  }

ngOnInit():void {
  this._dataService.getProductData(this.Category)
  .subscribe(products => {this.products = products;
    console.log(this.products);
});

this._BehaviorSubjectService.telecast.subscribe((message) => {    
        console.log(message);
        this.message = message;
      }
      )
}
}