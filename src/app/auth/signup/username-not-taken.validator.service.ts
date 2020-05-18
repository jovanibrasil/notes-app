import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { SignUpService } from 'src/app/shared/services/signup.service';
import { debounceTime, switchMap, map, first, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken(){
        return (control : AbstractControl) => {
            return control.valueChanges
                .pipe(debounceTime(500))
                .pipe(switchMap(userName =>  // switch to the next flux (checkUserNameTaken result) 
                    this.signUpService.checkUserNameTaken(userName)
                ), catchError( () => { return of(null); } ))               
                .pipe(map(
                    data => {
                        return data ? { userNameTaken: true } : null;
                    }, err=> { console.log(err); }))
                .pipe(first());
        }
    }

}