import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../../auth/model/jwt.response';
import { User } from '../../auth/model/user';
import { environment } from 'src/environments/environment';


/*
  The AuthService handles authentication operations using HttpClient.
*/
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private BASE_URL = environment.AUTH_BASE_URL;
    private LOGIN_URL =  `${this.BASE_URL}/token/create`;
    private TOKEN_REFRESH_URL =  `${this.BASE_URL}/token/refresh`;
    private LOGOUT_URL =  `${this.BASE_URL}/token/remove`;
    private LOGON_URL = `${this.BASE_URL}/auth/logon`
    private GET_AUTHORITY = `${this.BASE_URL}/authorities`;
    private REFRESH_AUTH_URL =  `${this.BASE_URL}/auth/refresh`;

    private VERIFY_REGISTRATION = `${this.BASE_URL}/users/confirmation`;
    private SIGNUP_URL =  `${this.BASE_URL}/users`;
    
    model: any = {};
  
    constructor(private http: HttpClient) { }

    login(data: any, recapchaValue: string){
      return this.http.post<JwtResponse>(this.LOGIN_URL, data, 
        { params : { recaptchaResponseToken : recapchaValue } })//.shareReplay();
    }

    logout(){
      return this.http.get<JwtResponse>(this.LOGOUT_URL)//.retry(5); // retryWhen //.shareReplay();
    }

    saveUser(data: any, recapchaValue: string): Observable<User>{
      return this.http.post<User>(this.SIGNUP_URL, data, 
        { params : { recaptchaResponseToken : recapchaValue } });
    }

    verifyRegistrationToken(token: string) {
      return this.http.post(this.VERIFY_REGISTRATION, null, 
        { params : { token: token }  });
    }
    
}