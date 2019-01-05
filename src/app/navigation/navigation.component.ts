import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { updateBinding } from '@angular/core/src/render3/instructions';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    private authority: string;

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {};

    ngOnInit() {
        this.updateNavigation();
        this.tokenStorageService.getTheBoolean().subscribe(
            value => { 
                this.updateNavigation() 
            }
        );
    }

    updateNavigation(){
        this.authority = null;
        // get authority from using auth service
        console.log("Updating navigaation component")
        let roles = this.tokenStorageService.getAuthorities();
        console.log(roles);
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