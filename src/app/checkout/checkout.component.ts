import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import {ActivatedRoute} from "@angular/router";
declare let paypal:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
model:any = {};
data;
finalAmount:number = parseInt(this.model.amount);
addScript;
currentUserName;
paypalConfig = {
  env: 'sandbox',
  client: {
    sandbox: 'AfYTZosWu-DmRYuk7uuqBuZv1NPcZag5S7pDV3h1We8QRvmPYz8ZkYp5t4GoNXkGf65gEztuuGbSpCDS',
    production:''
  },
  commit: true,
  payment:(data,actions) =>{
    return actions.payment.create({
      payment: {
                        transactions: [
                            {
                                amount: { total: parseInt(this.model.amount), currency: 'INR' }
                            }
                        ]
      }
    });
  },
  onAuthorize:(data,actions) =>{
    return actions.payment.execute().then((payment)=>{

    })
  }
};
ngAfterViewChecked():void{
  if(!this.addScript){
    this.addPaypalScript().then(()=>{
      paypal.Button.render(this.paypalConfig,'#send');

    })
  }

}
addPaypalScript(){
  this.addScript = true;
  return new Promise((resolve,reject)=>{
    let scriptTagElement = document.createElement('script');
    scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
    scriptTagElement.onload = resolve;
    document.body.appendChild(scriptTagElement);
  })
}

  constructor(private _dataService: DataService,private http:Http,private route: ActivatedRoute) { 
     this.currentUserName = this.route.snapshot.params.currentUserName;
  }

  ngOnInit() {
    this.finalAmount = this.model.amount;
    this._dataService.getItemsFromCart(this.currentUserName)
    .subscribe(data=> {console.log(data[0].Quantity);
      this.model.amount = data[0].TotalPrice;
      this.model.currency = "INR";
    });    



  }


  onSubmit(){


  }

}
