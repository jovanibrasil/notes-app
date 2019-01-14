import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './model/jwt.response';
import { User } from './model/user';

/*
  The AuthService handles authentication operations using HttpClient.
*/
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private BASE_URL = 'http://localhost:9000';
    private LOGIN_URL =  `${this.BASE_URL}/auth/login`;
    private LOGOUT_URL =  `${this.BASE_URL}/auth/logout`;
    private LOGON_URL = `${this.BASE_URL}/auth/logon`
    private GET_AUTHORITY = `${this.BASE_URL}/authorities`;
    private REFRESH_AUTH_URL =  `${this.BASE_URL}/auth/refresh`;
    
    private SIGNUP_URL =  `${this.BASE_URL}/auth/signup`;
    
    model: any = {};
  
    constructor(private http: HttpClient) { }
  
    login(username: string, password: string){
      return this.http.post<JwtResponse>(this.LOGIN_URL, {email :username, password: password})//.shareReplay();
    }

    logout(){
      return this.http.get<JwtResponse>(this.LOGOUT_URL)//.retry(5); // retryWhen //.shareReplay();
    }

    logon(user: User){
      return this.http.post<JwtResponse>(this.LOGON_URL, user);//.shareReplay();
    }

    saveUser(user: User): Observable<User>{
      return this.http.post<User>(this.SIGNUP_URL, user);
    }
    
}