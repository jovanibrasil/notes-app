import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token.service';
import { tap, map } from 'rxjs/operators';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';


/*
    This interceptor intercepts all HTTP requests sended by the services.
*/
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    private TOKEN_HEADER_KEY = "Authorization";

    constructor(private tokenStorageService: TokenStorageService, 
        private toasterService: ToasterService, private route: Router) {}


    /*
        Get token from TokenSTorageService and add this token to the authorization header of the HTTP request.
    */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
 
         if(req){
        
            console.log("Request intercepted!")
            const token = this.tokenStorageService.getToken();
            // Check if JWT token is present
            if(token != null){
        
                if(!this.tokenStorageService.hasValidToken()){
                    console.log("Token expirou. Fazendo refresh do token.")
                    this.toasterService.info("Unauthorized access. Please, login to continue.");
                    this.route.navigate(['login']);
                }
        
                // Clone HTTP headers and add extra authorization header
                req = req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY, `Bearer ${token}`) });
                
            }
                 
        }
           
        return next.handle(req);
    }
}
