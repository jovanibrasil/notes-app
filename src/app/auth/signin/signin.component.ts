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
    // if(sessionStorage.getItem('token') != ''){
    //   this.router.navigate(['/notes']);  
    // }
  }

  ngOnInit() {
    // sessionStorage.setItem('token', '');
  }

  login(){
    this.authService.login(this.model.username, this.model.password).subscribe( 
      res => {
        if(res) {
          this.tokenStorage.saveToken(res.data.token);
          // this.tokenStorage.saveUserName(res.userName);
          // this.tokenStorage.saveAuthorities(res.authorities);
          this.router.navigate(['/notes']);
        } else {
          alert("Authenticantion failed.");
        }
      },
      error => { }
    );   
  }
}
