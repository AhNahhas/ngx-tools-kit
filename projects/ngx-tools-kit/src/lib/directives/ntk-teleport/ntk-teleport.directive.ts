import {
  afterEveryRender,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ntkTeleport]',
})
export class NtkTeleport implements OnDestroy {
  // Directive input
  ntkTeleport = input.required<string>();

  // Private injected services
  private injector = inject(Injector);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  // Elements
  private host = inject(ElementRef);
  private parent?: HTMLElement;
  private placeholder?: HTMLElement;

  constructor() {
    afterEveryRender(() => this.setUp());
  }

  ngOnDestroy(): void {
    this.tearDown();
  }

  private setUp(): void {
    // Cleanup last compute
    this.tearDown();

    const selector = this.ntkTeleport();
    const target = this.document.querySelector(selector);

    // Throw error if target not found
    if (!target) throw new Error(`Target not found: ${selector}`);

    // Get references
    this.parent = this.host.nativeElement.parentNode;
    this.placeholder = this.renderer.createComment(`ntkTeleport-${this.ntkTeleport()}`);

    // Apply changes on DOM
    this.renderer.insertBefore(this.parent, this.placeholder, this.host.nativeElement);
    this.renderer.appendChild(target, this.host.nativeElement);
  }

  private tearDown(): void {
    if (!this.parent || !this.placeholder) return;

    const commentParent = this.placeholder.parentNode;
    this.renderer.insertBefore(commentParent, this.host.nativeElement, this.placeholder);
    this.renderer.removeChild(this.placeholder.parentNode, this.placeholder);
    this.parent = undefined;
    this.placeholder = undefined;
  }
}
