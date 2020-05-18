import { Injectable } from '@angular/core';
import { SignUpService } from 'src/app/shared/services/signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, catchError, map, first } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkEmailTaken(){
        return (control : AbstractControl) => {
            return control.valueChanges
                .pipe(debounceTime(500))
                .pipe(switchMap(email => 
                    this.signUpService.checkEmailTaken(email)),
                    catchError( () => { return of(null) } ))
                .pipe(map(
                    data => {
                        return data ? { emailTaken: true } : null;
                    }, 
                ))
                .pipe(first())
        }
    }

}