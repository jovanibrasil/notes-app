import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token.service';

/*
  The LoginComponent contains the login form logic.
*/
@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private tokenStorageService: TokenStorageService, private authService: AuthService) { 
      if(this.tokenStorageService.hasValidToken()){
        this.router.navigate(['/notes']);  
      }
  }

  ngOnInit() { }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  login(){
    this.authService.login(this.model.username, this.model.password).subscribe( 
      res => {
        if(res) {
          this.tokenStorageService.saveToken(res.data.token);
          console.log(this.parseJwt(res.data.token));
          this.tokenStorageService.saveUserName(this.parseJwt(res.data.token).sub);
          this.tokenStorageService.saveAuthorities([this.parseJwt(res.data.token).role]);
          this.tokenStorageService.setLoggedIn(true);
          this.router.navigate(['/notes']);
          //window.location.reload();
        } else {
          alert("Authenticantion failed.");
        }
      },
      error => { }
    );   
  }
}