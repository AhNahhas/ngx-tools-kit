import { Component, computed, contentChildren } from '@angular/core';
import { NtkBulkLoadable } from './ntk-bulk-loadable.directive';

@Component({
  selector: 'ntk-bulk-load',
  template: `
    @if (whenDone()) {
      <ng-content></ng-content>
    } @else {
      <ng-content select="[ntkBulkPending]"></ng-content>
    }
  `,
})
export class NtkBulkLoad {
  children = contentChildren(NtkBulkLoadable);
  whenDone = computed(() => this.children().every(child => child.ready()));
}
