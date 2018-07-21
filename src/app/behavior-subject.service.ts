import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BehaviorSubjectService {

public message = new BehaviorSubject<string>('login');
telecast = this.message.asObservable();

public cartItem = new BehaviorSubject<number>(0);
telecastCartItem = this.cartItem.asObservable();

public cartItemTotalPrice = new BehaviorSubject<number>(0);
telecastcartItemTotalPrice = this.cartItemTotalPrice.asObservable();
  

setMessage(value: string) {  
  
    this.message.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
}

CartQuantity(value) {   
  
    this.cartItem.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
}

setCartItemTotalPrice(value) {   
  
    this.cartItemTotalPrice.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
}



  constructor() { }

}
