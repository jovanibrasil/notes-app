import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MainBannerComponent } from './signin/main-banner/main-banner.component';
import { ToasterModule } from '../shared/toaster/toaster.module';

@NgModule({
    declarations: [ 
        SignUpComponent,
        SignInComponent,
        MainBannerComponent
    ],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        FormsModule,
        NgxCaptchaModule,
        ToasterModule
    ]
})
export class AuthModule {}