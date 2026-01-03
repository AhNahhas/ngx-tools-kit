import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formControlError',
})
export class FormControlErrorPipe implements PipeTransform {
  transform(control: AbstractControl, errorMapping: Record<string, unknown>): unknown {
    if (!control.errors) return null;

    for (const key in control.errors) {
      if (errorMapping[key]) {
        return errorMapping[key];
      }
    }

    return Object.values(control.errors)[0];
  }
}
