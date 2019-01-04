import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    private authority: string;

    constructor(private authService: AuthService) {};

    ngOnInit() {
        // get authority from using auth service
        this.authority = this.authService.getAuthority();
    }

    logout() {
        this.authService.logout();
    }

}