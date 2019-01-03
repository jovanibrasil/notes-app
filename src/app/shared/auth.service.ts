import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private LOGIN_URL = 'http://localhost:8080/login';

    model: any = {};
  
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { 
      if(sessionStorage.getItem('token') != ''){
        this.router.navigate(['/notes']);  
      }
    }
  
    login(username: string, password: string){
      // let result = this.http.post<Observable<boolean>>(this.LOGIN_URL, 
      //   {userName :username, password: password}
      // ).subscribe( res => {
      //   if(res) {
      //     sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
      //     this.router.navigate(['']);
      //   } else {
      //     alert("Authenticantion failed.");
      //   }
      // } );
      sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
      this.router.navigate(['/notes']);
    }

    logout(){
        sessionStorage.removeItem('token');
        this.router.navigate(['']);
    }

}