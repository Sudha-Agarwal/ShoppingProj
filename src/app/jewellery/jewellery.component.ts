import { Component, OnInit } from '@angular/core';
import{DataService} from '../data.service';
@Component({
  selector: 'app-jewellery',
  templateUrl: './jewellery.component.html',
  styleUrls: ['./jewellery.component.css']
})
export class JewelleryComponent implements OnInit {
message;
  constructor(private _dataService:DataService) { }

  ngOnInit() {
    
  }

}
