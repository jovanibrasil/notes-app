import { AbstractControl } from '@angular/forms';

export function mustMatch(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('passwordConfirmation').value;

    // compare is the password match
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('passwordConfirmation').setErrors({ mustMatch: true });
      return { mustMatch: true };
    }
    return null;
  }