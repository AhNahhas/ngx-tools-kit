import {
  Component,
  ViewContainerRef,
  viewChild,
  contentChild,
  Type,
  ComponentRef,
  effect,
} from '@angular/core';
import { NtkComponentOutlet } from './ntk-component-outlet.directive';

@Component({
  selector: 'ntk-persistent-host',
  template: '<ng-container #main></ng-container>',
})
export class NtkPersistentHost {
  private readonly component = contentChild.required(NtkComponentOutlet);
  private readonly viewContainerRef = viewChild.required('main', {
    read: ViewContainerRef,
  });
  private readonly persistedComponents = new Map<Type<unknown>, ComponentRef<unknown>>();

  constructor() {
    effect(() => {
      const vcr = this.viewContainerRef();
      const componentOutlet = this.component();
      const componentType = componentOutlet.ntkComponentOutlet();
      const componentInputs = componentOutlet.ntkComponentOutletInputs();

      //clear vcr without desotrying the views
      vcr.detach();

      if (this.persistedComponents.has(componentType)) {
        const persistedComponent = this.persistedComponents.get(componentType)!;
        vcr.insert(persistedComponent.hostView);
      } else {
        const componentRef = vcr.createComponent(componentType);
        this.applyComponentInputs(componentRef, componentInputs);
        this.persistedComponents.set(componentType, componentRef);
      }
    });
  }

  private applyComponentInputs(ref: ComponentRef<unknown>, inputs?: Record<string, unknown>): void {
    if (!inputs) return;

    for (const [key, value] of Object.entries(inputs)) {
      ref.setInput(key, value);
    }
  }
}
