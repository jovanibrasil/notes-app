import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token.service';
import { ToasterService } from '../toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private route: Router, private toasterService: ToasterService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.tokenStorageService.isLogged()){
      this.route.navigate(['login']);
      this.toasterService.info("Unauthorized access. Please, login to continue.");
    }
    return this.tokenStorageService.isLogged();
  }
}
