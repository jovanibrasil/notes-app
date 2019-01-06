import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../model/user';
 
/*
  SignupComponent constains the logic of the registration form.
*/
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  userName: string;
  password: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  createUser(){
    
    let user: User = {
      email: this.email,
      userName: this.userName,
      password: this.password
    }
    
    this.apiService.saveUser(user).subscribe(
      res => {},
      err => { alert("An error has occurred. Could not save the user") }
    );  
  
  }

}
