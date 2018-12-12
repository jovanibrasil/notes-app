import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private LOGIN_URL = 'http://localhost:8080/login';

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login(){
    this.authService.login(this.model.username, this.model.password);
  }

}
