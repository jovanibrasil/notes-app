import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
 
/*
  SignupComponent constains the logic of the registration form.
*/
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  createUser(){
    
    let user: User = {
      email: this.model.email,
      userName: this.model.userName,
      password: this.model.password
    }
    
    this.apiService.saveUser(user).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => { alert("An error has occurred. Could not save the user") }
    );  
  
  }

}
