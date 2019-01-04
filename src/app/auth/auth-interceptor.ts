import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ApiService } from '../shared/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private apiService: ApiService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log("Request intercepted!")
        
        return next.handle(req);
    }
}
