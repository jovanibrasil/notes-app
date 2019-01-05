import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    private authority: string;

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {};

    ngOnInit() {
        // get authority from using auth service
        console.log("navigating");
        let roles = this.tokenStorageService.getAuthorities();
        roles.every(role => {
            this.authority = role;
            console.log(this.authority)
            if(role === 'ROLE_ADMIN'){
                return false
            }
            return true; // continue iterating the role vector
        });
    }

    logout() {
        this.tokenStorageService.signOut();
        //window.location.reload();
        this.router.navigate(['']);
    }

}