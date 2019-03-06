import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
 
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
  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createUser(){
    
    // verify recaptcha component status
    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      return;
    }
    this.model.captchaCode = recapchaValue;

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

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaError = false;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
