import { Component,OnInit } from '@angular/core';
import {DataService} from './data.service';
import {BehaviorSubjectService} from './behavior-subject.service';
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';
import {Cart} from './cart';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'app';
  applied = true;
  _showModal = false;
  model:any = {};
  isAdmin;login;
  cart:Cart[];
  isCartEmpty;

  message;cartItem;

constructor(private _dataService: DataService,private router: Router,private _BehaviorSubjectService:BehaviorSubjectService) {}
showdata(){
    this._dataService.checkLoginFromServer(this.model.Username,this.model.Password)
    .subscribe(data =>{
      if(data.length == 0){
        alert("error login");
      }
      else{
        this.router.navigate(['/home']);
      }
    });
  }

  showModal(){  
    this._showModal = false;
  }

  

  ngAfterContentInit(){

            
    /*if(localStorage.getItem("currentUser") == "admin"){
      alert("admin true");
        this.isAdmin = true;
        this.login = true; 
      }
      else{
        this.isAdmin = false;
        this.login = false;
      }   */ 
  };
  

    ngOnInit() {
      if(localStorage.getItem("currentUser") == "admin"){
        this.isAdmin = true;
        this.login = true; 
        this._BehaviorSubjectService.setMessage("Logout");
      }
      else if(localStorage.getItem("currentUser") == "user"){

        this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).
        subscribe(cart=>{this.cart=cart;
        console.log("cart " + cart[0].Quantity);
        this.isCartEmpty = false;
         this._BehaviorSubjectService.CartQuantity(cart[0].Quantity);
        });
         this.login = true;     
         this.isAdmin = false;
         this._BehaviorSubjectService.setMessage("Logout");
          
      }
      else{        
        this.login = false;
        this.isAdmin = false;
        this.isCartEmpty = true;
        //this.cart[0].Quantity = 0;     
          this._dataService.getItemsFromCart("nouser").
        subscribe(cart=>{this.cart=cart;
        console.log("cart " + cart[0].Quantity); 
                this._BehaviorSubjectService.CartQuantity(cart[0].Quantity);  
      });         
      this._BehaviorSubjectService.setMessage("Login");        
    }   
      this._BehaviorSubjectService.telecast.subscribe((message) => {        
       console.log(message);
       this.message = message;
      }
      );

      this._BehaviorSubjectService.telecastCartItem.subscribe((cartItem) => {        
       console.log(cartItem);
       this.cartItem = cartItem;
      }
       );
      

  }

  logOut(){
   
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserName");
      this.login = false;
      this.isAdmin = false;
      this.isCartEmpty = true;
      this.router.navigate(['/home']);
      //window.location.reload();
      this._BehaviorSubjectService.setMessage("Login");

  }
  showData(){
    alert(this.model.Username);
    //_dataService.checkLoginFromServer(this.model.Username,this.model.Password);    
  }

  
  checkLogin(){
    this._dataService.checkLoginFromServer(this.model.Username,this.model.Password)
    .subscribe(
                data => {
                  this.model.Username = "";
                  this.model.Password = "";
                    if(data.length == 0){
                      alert("error login");
                    }
                    else{
                        if(data[0].Flag == "admin"){
                          this.isAdmin = true;
                          localStorage.setItem('currentUser', data[0].Flag);
                           localStorage.setItem('currentUserName', data[0].Username);
                          //alert(localStorage.getItem("currentUser"));
                          this.login = true;
                          //window.location.reload();   
                          this._BehaviorSubjectService.setMessage("Logout");                          
                          this.router.navigate(['/admin-dashboard']);
                        }
                      else{
                        localStorage.setItem('currentUser', data[0].Flag);
                        localStorage.setItem('currentUserName', data[0].Username);
                         this.login = true;
                         this._dataService.getItemsFromCart(localStorage.getItem("currentUserName")).
                          subscribe(cart=>{this.cart=cart;
                          console.log("cart " + cart[0].Quantity);
                          this.isCartEmpty = false;
                          this._BehaviorSubjectService.CartQuantity(cart[0].Quantity); 

                        });
                        //window.location.reload(); 
                        this._BehaviorSubjectService.setMessage("Logout");                          
                        this.router.navigate(['/home']);

                      }
                    }
                },
                error => {
                    /*this.alertService.error(error);
                    this.loading = false;*/
                    alert("error login")
                });
  }



}
