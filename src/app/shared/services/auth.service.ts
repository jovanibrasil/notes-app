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

    private CREATE_USER = `${this.BASE_URL}/users`;
    private UPDATE_USER_PASSWORD = `${this.BASE_URL}/users`;

    private CONFIRM_USER_EMAIL_URL =  `${this.BASE_URL}/users/confirmation`;
    
    model: any = {};
  
    constructor(private http: HttpClient) { }

    login(data: any, recapchaValue: string){
      return this.http.post<JwtResponse>(this.LOGIN_URL, data, 
          { params : { recaptchaResponseToken : recapchaValue } })//.shareReplay();
    }

    logout(){
      return this.http.get<JwtResponse>(this.LOGOUT_URL)//.retry(5); // retryWhen //.shareReplay();
    }

    confirmUserEmail(data: any, recapchaValue: string): Observable<User>{
      return this.http.post<User>(this.CONFIRM_USER_EMAIL_URL, data, 
        { params : { recaptchaResponseToken : recapchaValue } });
    }

    createUser(data: any) {
      return this.http.post(this.CREATE_USER, data);
    }

    updateUserPassword(data: any){
      return this.http.put(this.UPDATE_USER_PASSWORD, data);
    }
    
}