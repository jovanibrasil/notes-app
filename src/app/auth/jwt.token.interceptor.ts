import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';

/*
    This interceptor intercepts all HTTP requests received by the app.
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private tokenStorageService: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        tap(
            (event: HttpEvent<any>) => { 
                if(event instanceof HttpResponse) {
                    console.log("Valid request received!")
                } 
            },
            (err: any) => {  
                if(err instanceof HttpErrorResponse) {
                    if(err.status === 401){ // Error 401 = Unauthorized access
                        console.log("Invalid request received!")
                        // TODO send to login page
                    }
                }
        })
        return next.handle(req);
    }

}