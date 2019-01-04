import { Injectable } from '@angular/core'
import { tokenKey } from '@angular/core/src/view';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    private TOKEN_KEY = 'AuthToken';
    private USERNAME_KEY = 'AuthUserName';
    private AUTHORITIES_KEY = 'AuthAuthorities';

    constructor() {}

    signOut() {
        window.sessionStorage.clear();
    }

    saveToken(token: string){
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string{
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    saveUserName(userName: string){
        window.sessionStorage.removeItem(this.USERNAME_KEY);
        window.sessionStorage.setItem(this.USERNAME_KEY, userName);
    }

    getUserName(): string {
        return sessionStorage.getItem(this.USERNAME_KEY);
    } 

    saveAuthorities(authorities: string[]) {
        window.sessionStorage.removeItem(this.AUTHORITIES_KEY);
        window.sessionStorage.setItem(this.AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    getAuthorities(): string[] {
        let roles = [];
        if(window.sessionStorage.getItem(this.AUTHORITIES_KEY)){
            JSON.parse(window.sessionStorage.getItem(this.AUTHORITIES_KEY)).forEach(element => {
                roles.push(element.authority);
            });
        }
        return roles;
    }

}