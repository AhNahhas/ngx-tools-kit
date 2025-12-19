import { Directive, input, Type } from '@angular/core';

@Directive({
  selector: '[ntkComponentOutlet]'
})
export class NtkComponentOutlet {
  ntkComponentOutlet = input.required<Type<any>>();
  ntkComponentOutletInputs = input<Record<string, unknown>>();
}
