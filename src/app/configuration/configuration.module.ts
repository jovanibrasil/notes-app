import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigurationComponent } from './configuration.component';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToasterModule } from '../shared/toaster/toaster.module';
import { PasswordComponent } from './password/password.component';

@NgModule({
    declarations: [
        ConfigurationComponent,
        PasswordComponent
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgxCaptchaModule,
        ToasterModule
    ]
})
export class ConfigurationModule {

}