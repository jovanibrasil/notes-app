import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { Timer } from 'src/app/toaster/itoast';

/*
  The LoginComponent contains the login form logic.
*/
@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};
  loading: any = null;
  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;

  logging: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private tokenStorageService: TokenStorageService,
     private authService: AuthService, private toasterService: ToasterService) { 

      this.model.username = '';
      this.model.password = '';

      if(this.tokenStorageService.hasValidToken()){
        this.router.navigate(['/notes']);  
      }
  }

  ngOnInit() {}

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  login(){
    try {
      
    this.logging = true;
    
    //verify recaptcha component status
    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      this.logging = false;
      return;
    }

    let data =  {
      userName: this.model.username, 
      password: this.model.password,
      application: "NOTES_APP"
    }

    this.authService.login(data, recapchaValue).subscribe( 
        res => {
          if(res) {
            this.tokenStorageService.saveToken(res.data.token);
            this.tokenStorageService.saveUserName(this.parseJwt(res.data.token).sub);
            this.tokenStorageService.saveAuthorities([this.parseJwt(res.data.token).role]);
            this.tokenStorageService.setLoggedIn(true);
            this.router.navigate(['/notes']);
            //window.location.reload();
          } else {
            this.toasterService.error("Authentication error. Check your username and password.", false, Timer.Long);
            this.logging = false;   
          }
        },
        error => {
          this.toasterService.error("Authentication error. Check your username and password.", false, Timer.Long);
          this.logging = false;
        }
      );
    } catch (error) {
      this.toasterService.error("Authentication error."); // TODO Tratar adequadamente
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
