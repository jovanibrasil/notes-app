import { Injectable } from '@angular/core'
import { tokenKey } from '@angular/core/src/view';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    private TOKEN_KEY = 'AuthToken';
    private USERNAME_KEY = 'AuthUserName';
    private AUTHORITIES_KEY = 'AuthAuthorities';
    private loggedInStatus: boolean;

    constructor() {
        this.loggedInStatus = false;
    }

    isLogged(): boolean{
        return this.loggedInStatus;
    }

    setLoggedIn(status: boolean){
        this.loggedInStatus = status;
    }

    signOut() {
        window.sessionStorage.clear();
        this.setLoggedIn(false);
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.removeItem(this.USERNAME_KEY);
    }

    saveToken(token: string){
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.setItem(this.TOKEN_KEY, token);
        window.sessionStorage.removeItem(this.AUTHORITIES_KEY);
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
        console.log(authorities);
        window.sessionStorage.removeItem(this.AUTHORITIES_KEY);
        window.sessionStorage.setItem(this.AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    getAuthorities(): string[] {
        let roles = [];
        if(window.sessionStorage.getItem(this.AUTHORITIES_KEY)){
            JSON.parse(window.sessionStorage.getItem(this.AUTHORITIES_KEY)).forEach(element => {
                roles.push(element);
            });
        }
        return roles;
    }

    hasValidToken(): boolean {
        if(window.sessionStorage.getItem(this.TOKEN_KEY)){
            return true;
        }
        return false;
    }

}