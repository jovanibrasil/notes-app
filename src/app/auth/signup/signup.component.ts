import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Timer } from 'src/app/shared/toaster/itoast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { mustMatch } from 'src/app/shared/validators/must-match.validator';
import { UserDTO } from '../userDTO';
import { UserNotTakenValidatorService } from './username-not-taken.validator.service';
import { EmailNotTakenValidatorService } from './email-not-taken.validator.service';
 
/*
  SignupComponent constains the logic of the registration form.
*/
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  loading: any = null;
  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;
  logging: boolean = false;

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router, private toasterService: ToasterService, 
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private emailNotTakenValidatorService: EmailNotTakenValidatorService) { }

  ngOnInit() {    
    this.signUpForm = this.formBuilder.group({
      email : ['', Validators.compose([
        Validators.required, 
        Validators.email, 
        Validators.maxLength(30)]),
        this.emailNotTakenValidatorService.checkEmailTaken()
      ],
      userName: ['', Validators.compose([
          Validators.required, 
          lowerCaseValidator,
          Validators.minLength(2), 
          Validators.maxLength(12)]),
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
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
    try {
      this.logging = true;
      
      let recapchaValue = this.captchaElem.getResponse();
      if(!recapchaValue) {
        this.captchaError = true;
        this.loading = false;
        return;
      }

      const newUser: UserDTO = this.signUpForm.getRawValue() as UserDTO; 
      console.log(recapchaValue);
      this.authService.createUser(newUser, recapchaValue).subscribe(
        res => {
          this.toasterService.success("Cadastro confirmado. Faça seu login agora!", false, Timer.Long);
          this.loading = false;
          this.router.navigate(['/']);
        },
        err => {
          this.toasterService.error("Ops! Dados inválidos, por favor revise as informações.", true, Timer.Long);
          this.loading = false;
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
