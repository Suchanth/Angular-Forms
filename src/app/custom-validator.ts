import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static noSpecialCharacters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const pattern = /^[a-zA-Z0-9\s]*$/;
      if (value && !pattern.test(value)) {
        return { 'noSpecialCharacters': true };
      }
      return null;
    };
  }

  static noNumericCharacters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const pattern = /^[^0-9]*$/;
      if (value && !pattern.test(value)) {
        return { 'noNumericCharacters': true };
      }
      return null;
    };
  }
}
