import { Component, OnInit, ViewChild } from '@angular/core';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToasterService } from '../shared/services/toaster.service';
import { Timer } from '../shared/toaster/itoast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { mustMatch } from '../shared/validators/must-match.validator';

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
  
  passwordChanged: boolean = false;

  updatePasswordForm: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private toastService: ToasterService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(12)])
      ],
      passwordConfirmation: ['', Validators.required],
      recaptcha: ['']
    }, {
      validator: mustMatch
    });
  }

  submit(){

    this.loading = true;

    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      this.loading = false;
      return;
    }

    const updatePasswordDTO = {
      password : this.updatePasswordForm.getRawValue().password
    }; 

    this.authService.updateUserPassword(updatePasswordDTO, "recapchaValue").subscribe(
      res => {
        this.loading = false;
        this.passwordChanged = true;
        this.closeCard();
        this.updatePasswordForm.reset();
        this.toastService.success("Senha alterada com sucesso.", false, Timer.Long);

      }, 
      err => {
        // this.toastService.error("Houve um problema ao alterar sua senha. Tente mais tarde.", false, Timer.Long);
        // this.loading = false;
      }
    );

  }

  closeCard(){
    document.getElementById('collapseOne').classList.remove('show');
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaError = false;
  }

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
