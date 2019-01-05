import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService, private authService: AuthService) { 
      if(this.tokenStorage.hasValidToken()){
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
          this.tokenStorage.saveToken(res.data.token);
          console.log(this.parseJwt(res.data.token));
          this.tokenStorage.saveUserName(this.parseJwt(res.data.token).sub);
          this.tokenStorage.saveAuthorities([this.parseJwt(res.data.token).role]);
          this.tokenStorage.setLoggedIn(true);
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
