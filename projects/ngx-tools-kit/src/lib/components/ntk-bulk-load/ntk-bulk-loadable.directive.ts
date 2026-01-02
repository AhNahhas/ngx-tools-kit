import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[ntkBulkLoadable]',
})
export class NtkBulkLoadable {
  ready = signal<boolean>(false);

  markReady(value: boolean): void {
    this.ready.set(value);
  }
}
