import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
 
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
  loading: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createUser(){
    
    let user: User = {
      email: this.model.email,
      userName: this.model.userName,
      password: this.model.password,
      signDate: new Date()
    }
    
    this.authService.saveUser(user).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => { alert("An error has occurred. Could not save the user") }
    );  
  
  }

}
