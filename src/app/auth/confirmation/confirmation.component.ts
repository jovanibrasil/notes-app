import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Timer } from 'src/app/toaster/itoast';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  model: any = {};

  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private toasterService:ToasterService,
    private router: Router,
    private authService: AuthService
  ) {
    this.model.userName = '';
    this.model.password = '';
    this.model.passwordConfirmation = '';
  }

  ngOnInit() {}

  createUser(){

    this.loading = true;

    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      this.loading = false;
      return;
    }

    let token: string = this.route.snapshot.queryParamMap.get('token');
    
    let user = {
      userName: this.model.userName,
      password: this.model.password,
      token: token
    }
    
    if(token){
      // if the token is present, wait server verification response     
      this.authService.createUser(user).subscribe(
        res => {
          this.toasterService.success("Confirmed! Please, login with your credentials.", true, Timer.Long);
          this.loading = false;
          this.router.navigate(['/']);
        },
        err => { 
          this.toasterService.error("Error! Please, contact the support.", true, Timer.Long);
          this.loading = false;
          this.router.navigate(['/']);  
        }
      );
    }else{
      // token is not present
      // show a spinner by five seconds
      this.toasterService.error("Error! Invalid token. Please, contact the support.", true, Timer.Long);
      this.loading = false;
      this.router.navigate(['/']);  
    }
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaError = false;
  }

  passwordMatch() : boolean {
    return this.model.password === this.model.passwordConfirmation;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
