import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token.service';

/*
    This interceptor intercepts all http request sended by the services.
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
        if(token != null){
            req = req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY, `Bearer ${token}`) });
        }
        return next.handle(req);
    }
}
