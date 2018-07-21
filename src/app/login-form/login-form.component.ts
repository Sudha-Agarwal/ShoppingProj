import { Component, OnInit } from '@angular/core';
import{User} from '../user';
import{DataService} from '../data.service';
import {Observable} from "rxjs/Observable"
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
users:User[];
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getData().subscribe(User1=> this.users = User1);
  }

}
