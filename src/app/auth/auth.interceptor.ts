import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token.service';

/*
    This interceptor intercepts all HTTP requests sended by the services.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private TOKEN_HEADER_KEY = "Authorization";

    constructor(private tokenStorageService: TokenStorageService) {}

    /*
        Get token from TokenSTorageService and add this token to the authorization header of the HTTP request.
    */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request intercepted!")
        const token = this.tokenStorageService.getToken();
        // Check if JWT token is present
        if(token != null){
            // Clone HTTP headers and add extra authorization header
            req = req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY, `Bearer ${token}`) });
        }
        return next.handle(req);
    }
}
