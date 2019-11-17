import { Component, OnInit, ViewChild } from '@angular/core';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToasterService } from '../shared/services/toaster.service';
import { Timer } from '../toaster/itoast';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;
  loading: boolean = false;
  model: any;

  passwordChanged: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private toastService: ToasterService
  ) {
    this.model = {
      actualPassword: "",
      newPassword: "",
      newPasswordConfirmation: ""
    }
  }

  ngOnInit() {}

  updateUserPassword(){

    this.loading = true;

    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      this.loading = false;
      return;
    }

    console.log(this.model)

    this.authService.updateUserPassword(this.model).subscribe(
      res => {
        this.toastService.success("Senha alterada com sucesso.", false, Timer.Long);
        this.loading = false;
        this.passwordChanged = true;
      }, 
      err => {
        this.toastService.error("Houve um problema ao alterar sua senha. Tente mais tarde.", false, Timer.Long);
        this.loading = false;
      }
    );

  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaError = false;
  }

  passwordMatch() : boolean {
    return this.model.newPassword === this.model.newPasswordConfirmation;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
