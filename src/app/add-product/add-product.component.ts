import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import{Category} from '../category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

category;
img_name;
url;
categoryValue;
categoryList:Category[];
showProductData;
editProductData;

model:any = {};
  constructor(private _dataService: DataService,private router: Router) { }

  ngOnInit() {    
     if(localStorage.getItem("currentUser") != "admin"){
       this.router.navigate(['/home']);
     }
        this._dataService.getCategory()
      .subscribe(categoryList => {this.categoryList = categoryList;
      console.log(this.categoryList);
    });
  }

  AddProductdata(){
    this._dataService.addProductdata(this.model)
    .subscribe(categoryList => {this.categoryList = categoryList;
    console.log(this.categoryList);
  },
  error=>{
    console.log(error);
  });

  }

  getProductData(categoryValue){
    this.model.Category = categoryValue    
  }


  readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    
    var str = this.model.imgPath;
    var splitted = str.split("\\"); 
    alert(splitted[2]);
    this.model.imgPath = splitted[2];
    alert(this.model.imgPath);
  }
}


}
