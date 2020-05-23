import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { mustMatch } from 'src/app/shared/validators/must-match.validator';
import { Timer } from 'src/app/shared/toaster/itoast';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;
  loading: boolean = false;
  updatePasswordForm: FormGroup;
  
  @Output() success = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, 
    private toastService: ToasterService) { }

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
    this.authService.updateUserPassword(updatePasswordDTO, recapchaValue).subscribe(
      res => {
        this.loading = false;
        this.success.emit();
        this.reloadCaptcha();
        this.updatePasswordForm.reset();
        this.toastService.success("Senha alterada com sucesso.", false, Timer.Long);
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

  reloadCaptcha(): void {
    this.captchaElem.reloadCaptcha();
  }

}
