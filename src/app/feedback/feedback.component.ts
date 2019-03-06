import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/services/api.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: '',
    captchaCode: ''
  };

  captchaError: boolean;
  captchaSuccess: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  recaptcha: any;
  key: String = environment.RECAPTCHA_KEY;


  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    
  }

  sendFeedback(): void {
    let url = "http://localhost:8080/api/feedback";
    //alert(this.model.name);

    // verify recaptcha component status
    let recapchaValue = this.captchaElem.getResponse();
    if(!recapchaValue) {
      this.captchaError = true;
      return;
    }
    this.model.captchaCode = recapchaValue;

    this.apiService.postFeedback(this.model).subscribe(
      res => {
        location.reload(); // refresh page
      },
      err => {
        alert("An error has occurred while sending feedback");
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

export interface FeedbackViewModel{
  name: string;
  email: string;
  feedback: string;
  captchaCode: string
}
