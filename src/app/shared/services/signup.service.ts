import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    
    private BASE_URL = environment.AUTH_BASE_URL; 
    private VERIFY_USER_NAME = `${this.BASE_URL}/users/`;
    private VERIFY_USER_EMAIL = `${this.BASE_URL}/users`;

    constructor(private http: HttpClient){}

    checkUserNameTaken(userName: string){
        return this.http.head(this.VERIFY_USER_NAME + userName, {observe: 'response'});
    }

    checkEmailTaken(email: string) {
        let params = new HttpParams().append("email", email);
        return this.http.head(this.VERIFY_USER_EMAIL, { params , observe: 'response'});
    }

}