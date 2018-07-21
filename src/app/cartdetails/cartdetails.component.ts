import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Cart} from '../cart';
import {BehaviorSubjectService} from '../behavior-subject.service';
//import * as $ from "jquery";

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
cartItem;cartItemTotalPrice;
Username;
cart:Cart[];
Price;SKU;Quantity;
item:any={};
currentUserName;

  constructor(private _dataService: DataService,private _BehaviorSubjectService:BehaviorSubjectService) { }

  ngOnInit() {
    this.getTotalCount();
    this.getItemsfromCart();

    this.currentUserName = localStorage.getItem('currentUserName');

    this._BehaviorSubjectService.telecastCartItem.subscribe((cartItem) => {        
    console.log(cartItem);
    this.cartItem = cartItem;
  });
  this._BehaviorSubjectService.telecastcartItemTotalPrice.subscribe((cartItemTotalPrice) => {        
    console.log(cartItemTotalPrice);
    this.cartItemTotalPrice = cartItemTotalPrice;
    });


  }

  getTotalCount(){
    this.Username = localStorage.getItem("currentUserName");
    this._dataService.getItemsFromCart(this.Username)
    .subscribe(data=> {console.log(data[0].Quantity);
      this.cartItem = data[0].Quantity;
      this.cartItemTotalPrice = data[0].TotalPrice;
    });    
  }

  getItemsfromCart(){
    this._dataService.getAllItemsFromCart(this.Username)
    .subscribe(data=>this.cart = data);
  }

  saveItems(Username,SKU,Quantity,Price){
    if(Quantity == 0){
          this._dataService.deleteFromCart(Username,SKU)
    .subscribe(cart=>{this.cart = cart;
            this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).subscribe(
        cart=> {
          this._BehaviorSubjectService.CartQuantity(cart[0].Quantity);  
          this._BehaviorSubjectService.setCartItemTotalPrice(cart[0].TotalPrice);  
        }
      );  
      //window.location.reload();
    });
    
    }
    else{
  this._dataService.updateItemsInCart(Username,SKU,Quantity,Price)
    .subscribe(cart=>{this.cart=cart;
      this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).subscribe(
        cart=> {
          this._BehaviorSubjectService.CartQuantity(cart[0].Quantity);  
          this._BehaviorSubjectService.setCartItemTotalPrice(cart[0].TotalPrice);
        }
      );  

      //window.location.reload(); 
      
    });
    }
  }

  deleteItem(Username,SKU){
    this._dataService.deleteFromCart(Username,SKU)
    .subscribe(cart=>{this.cart = cart;
      this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).subscribe(
        cart=> {
          this._BehaviorSubjectService.CartQuantity(cart[0].Quantity); 
          this._BehaviorSubjectService.setCartItemTotalPrice(cart[0].TotalPrice); 
        }
      );  
      //window.location.reload();
    });
  } 

  /*checkoutPayPal(){
    var data = {
    cmd: "_cart",
    //business: params.merchantID,
    upload: "1",
    rm: "2",
    charset: "utf-8"
  };

  // item data
  for (var i = 0; i < this.cart.length; i++) {
    var item = this.cart[i];
    var ctr = i + 1;
    data["item_number_" + ctr] = item.SKU;
    data["item_name_" + ctr] = item.Name;
    data["quantity_" + ctr] = item.Quantity;
    data["amount_" + ctr] = item.Price.toFixed(2);
  }


  // build form
  var form = $('<form></form>');
  form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
  form.attr("method", "POST");
  form.attr("style", "display:none;");
  this.addFormFields(form, data);
  //this.addFormFields(form, parms.options);
  $("body").append(form);

  // submit form
 
  form.submit();
  form.remove();
    
}

addFormFields(form,data){
  if (data != null) {
        $.each(data, function (name, value) {
            if (value != null) {
                var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                form.append(input);
            }
        });
    }

}*/

}
