import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/services/token.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterService } from '../shared/services/toaster.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authority: string;

    constructor(private tokenStorageService: TokenStorageService, private router: Router, 
        location: Location, private toasterService: ToasterService) {};

    getLOcationPath(){
        return location.pathname;
    }

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
        // get authority using auth service
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
        this.tokenStorageService.removeToken();
        //window.location.reload();
        this.toasterService.success("You have been logged out successfully.", true);
        this.router.navigate(['']);
    }

}