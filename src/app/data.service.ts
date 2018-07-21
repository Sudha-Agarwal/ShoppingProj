import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import{Products} from './products';
import{User} from './user';
import{Cart} from './cart';
import{Category} from './category'
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }



  getData():Observable<User[]>{

    return this._http.get('api/list')
    .map((response:Response)=><User[]>response.json())
    .do(data1=> console.log(JSON.stringify(data1)));
  }
  checkLoginFromServer(Username:String,Password:String):Observable<User[]>{
   
    return this._http.post("api/check-login",{Username,Password})
    .map(response => <User[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }
  
  getCategory():Observable<Category[]>{
    return this._http.get("/api/getProductCategory")
      .map((response:Response) => <Category[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }

  getProductData(Category:String):Observable<Products[]> {    
    return this._http.post("/api/getProductData",{Category})
      .map((response:Response) => <Products[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  } 

  updateProductData(model:any){
        let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this._http.post("api/updateProductData",JSON.stringify(model),options)
      .map((response:Response) => <Products[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }

  addProductdata(model:any){
        let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});
    return this._http.post("api/addProductData",JSON.stringify(model),options)
      .map((response:Response) => <Products[]> response.json())
      .catch((error: any) => {
                            return Observable.throw( new Error("error occured"+error.status));

                        })
      .do(data => console.log(JSON.stringify(data)));
  }

    deleteProductData(SKU:string,Category){
        return this._http.post("api/deleteProductData",{SKU,Category})
      .map((response:Response) => <Products[]> response.json())
      .catch((error: any) => {
                            return Observable.throw( new Error("error occured"+error.status));

                        })
      .do(data => console.log(JSON.stringify(data)));
  }

  

  getProductDetails(SKU:string){
    return this._http.get("api/getProductDetails/" + SKU)
      .map((response:Response) => <Products> response.json())
      .do(data => console.log(JSON.stringify(data)));

  }

  getItemsFromCart(Username:string){
    return this._http.post("api/getCartItems",{Username})
      .map((response:Response) => <Cart[]> response.json())
      .catch((error: any) => {
                           console.log(error);
                           return Observable.throw( new Error("error occured"+error.status));
                        })
      .do(data => console.log(JSON.stringify(data)));
  }

  getAllItemsFromCart(Username:string){
    return this._http.post("api/getCartItemsDetail",{Username})
      .map((response:Response) => <Cart[]> response.json())
      .catch((error: any) => {
                           console.log(error);
                           return Observable.throw( new Error("error occured"+error.status));
                        })
      .do(data => console.log(JSON.stringify(data)));
  }

  addItemsToCart(Username,SKU,Quantity,Price):Observable<Cart[]>{    
    return this._http.post("api/addItemsToCart",{Username,SKU,Quantity,Price})
      .map((response:Response) => <Cart[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }
  updateItemsInCart(Username,SKU,Quantity,Price):Observable<Cart[]>{    
    return this._http.post("api/UpdateItemsInCart",{Username,SKU,Quantity,Price})
      .map((response:Response) => <Cart[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }
  deleteFromCart(Username,SKU):Observable<Cart[]>{    
    return this._http.post("api/DeleteItemsInCart",{Username,SKU})
      .map((response:Response) => <Cart[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }

paynow(model){
  alert("paynow service");
  this._http.post("api/paynow1",{model});
}


}