import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl){

    // value is not empty and has invalid format
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)){
        return { lowerCase : true };
    }

    return null; // if there are no validation errors
}