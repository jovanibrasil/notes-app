import { Injectable } from '@angular/core'
import { tokenKey } from '@angular/core/src/view';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    private TOKEN_KEY = 'AuthToken';
    private USERNAME_KEY = 'AuthUserName';
    private AUTHORITIES_KEY = 'AuthAuthorities';
    private loggedInStatus: boolean;

    private theBoolean: BehaviorSubject<boolean>;

    constructor() {
        this.loggedInStatus = false;
        this.theBoolean = new BehaviorSubject<boolean>(false);
    }

    public getTheBoolean(): Observable<boolean> {
        return this.theBoolean.asObservable();
    }

    isLogged(): boolean{
        return this.loggedInStatus;
    }

    setLoggedIn(status: boolean){
        this.loggedInStatus = status;
        this.theBoolean.next(status);
    }

    signOut() {
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.removeItem(this.USERNAME_KEY);
        window.sessionStorage.removeItem(this.AUTHORITIES_KEY);
        window.sessionStorage.clear();
        this.setLoggedIn(false);
        this.theBoolean.next(false);
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
        // TODO test expiration date
        if(window.sessionStorage.getItem(this.TOKEN_KEY)){
            return true;
        }
        return false;
    }

}