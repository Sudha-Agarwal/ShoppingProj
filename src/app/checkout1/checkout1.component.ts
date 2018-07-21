import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions,Response } from '@angular/http';

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.css']
})
export class Checkout1Component implements OnInit {
model:any = {};
  constructor(private _http: Http) { }

  ngOnInit() {
   
  }

  submit(){
    alert("submit");
  this._http.post('api/pay', JSON.stringify(this.model))
    .subscribe(data=>{console.log(data.url);
      window.location.href = data.url;
  });
  }

}
