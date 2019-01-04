import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    private authority: string;

    constructor(private tokenStorageService: TokenStorageService) {};

    ngOnInit() {
        // get authority from using auth service
        let roles = this.tokenStorageService.getAuthorities();
        roles.every(role => {
            this.authority = role;
            if(role === 'ROLE_ADMIN'){
                return false
            }
            return true; // continue iterating the role vector
        });
    }

    logout() {
        //this.authService.logout();
    }

}