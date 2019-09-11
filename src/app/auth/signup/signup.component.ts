import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/shared/services/toaster.service';
 
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
  logging: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toasterService: ToasterService) { }

  ngOnInit() {  }
  
  createUser(){
    try {
      this.logging = true;
      // verify recaptcha component status
      let recapchaValue = this.captchaElem.getResponse();
      if(!recapchaValue) {
        this.captchaError = true;
        this.logging = false;
        return;
      }
      this.model.captchaCode = recapchaValue;

      let user = {
        email: this.model.email,
        userName: this.model.userName,
        password: this.model.password,
        application: "NOTES_APP"
      }
      
      this.authService.saveUser(user).subscribe(
        res => {
          this.toasterService.success("User successfuly registered! Please, login using your new credentials.", true);
          this.router.navigate(['/']);
        },
        err => { 
          this.toasterService.error("User registration error. Check your username, email and password.");
          this.logging = false;
        }
      );
    } catch (error) {
      this.toasterService.error("Authentication error.");
      this.logging = false;
    }
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaError = false;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
