import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login(){
    this.authService.login(this.model.username, this.model.password);
  }

}
