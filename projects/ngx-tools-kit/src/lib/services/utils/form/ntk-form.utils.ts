import { Injectable, Predicate } from '@angular/core';
import { ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NtkFormUtils {
  emailValidator(allowBlank = false): ValidatorFn {
    return allowBlank
      ? Validators.email
      : Validators.compose([this.notBlankValidator(), Validators.email])!;
  }

  dateValidator(allowNull = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: Date = control.value;
      if ((allowNull && value == null) || this.isValidDate(value)) return null;
      return { message: 'error.invalid_date' };
    };
  }

  positiveNumberValidator(allowNull = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: number = control.value;
      if (isNaN(value)) return { message: 'error.invalid_number' };
      if (!allowNull && value == null) return { message: 'error.null_value' };
      if (value < 0) return { message: 'error.negative_number' };
      return null;
    };
  }

  notBlankValidator(allowNull = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!allowNull && value == null) return { message: 'error.null_value' };
      if (value?.trim() === '') return { message: 'error.blank' };
      return null;
    };
  }

  notEmptyArrayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: unknown[] = control.value;
      if (value == null || value.length == 0) return { message: 'error.empty_array' };
      return null;
    };
  }

  predicateValidator<T>(predicate: Predicate<T>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!predicate(value)) {
        return { message: 'error.invalid_value' };
      }

      return null;
    };
  }

  private isValidDate(value: Date): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }
}
