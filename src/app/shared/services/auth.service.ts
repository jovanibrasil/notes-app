import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/auth/userDTO';
import { JwtResponse } from '../../auth/model/jwt.response';
import { TokenStorageService } from './token.service';


/*
  The AuthService handles authentication operations using HttpClient.
*/
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private BASE_URL = environment.AUTH_BASE_URL;
    private LOGIN_URL =  `${this.BASE_URL}/token/create`;
    private LOGOUT_URL =  `${this.BASE_URL}/token/remove`;
    private CREATE_USER = `${this.BASE_URL}/users`;
    private UPDATE_USER_PASSWORD = `${this.BASE_URL}/users`;
    
    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

    login(data: any, recapchaValue: string){
      return this.http.post<JwtResponse>(this.LOGIN_URL, data, { params : { recaptchaResponseToken : recapchaValue } })
        .pipe(tap(res => {
          // intercept the response before the subscriber and set authentication
          this.tokenStorageService.setToken(res.token);
        }))
    }

    logout(){
      return this.http.get<JwtResponse>(this.LOGOUT_URL)//.retry(5); // retryWhen //.shareReplay();
    }

    createUser(data: UserDTO, recapchaValue: string) {
      data.application = "NOTES_APP";
      return this.http.post(this.CREATE_USER, data,
        { params : { recaptchaResponseToken : recapchaValue } });
    }

    updateUserPassword(data: any){
      return this.http.put(this.UPDATE_USER_PASSWORD, data);
    }
    
}