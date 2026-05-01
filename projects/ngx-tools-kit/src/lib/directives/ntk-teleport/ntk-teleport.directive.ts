import {
  afterRenderEffect,
  computed,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
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
  placeholderText = computed(() => `ntkTeleport-${this.ntkTeleport()}`);

  // Private injected services
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  // Elements
  private host = inject(ElementRef);
  private placeholder?: HTMLElement;

  // Getters
  get parent(): HTMLElement {
    return this.host.nativeElement.parentNode as HTMLElement;
  }

  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        const selector = this.ntkTeleport();
        return this.document.querySelector(selector);
      },
      write: target => {
        const currentTarget = target();
        if (currentTarget) this.setup(currentTarget);
        else this.tearDown(true);
      },
    });
  }

  ngOnDestroy(): void {
    this.tearDown(true);
  }

  private setup(target: Element): void {
    this.tearDown(false);
    this.placeholder = this.renderer.createComment(this.placeholderText());
    this.renderer.insertBefore(this.parent, this.placeholder, this.host.nativeElement);
    this.renderer.appendChild(target, this.host.nativeElement);
  }

  private tearDown(flush: boolean): void {
    if (this.placeholder) {
      const commentParent = this.placeholder.parentNode;
      this.renderer.insertBefore(commentParent, this.host.nativeElement, this.placeholder);
      this.renderer.removeChild(commentParent, this.placeholder);
      if (flush) {
        this.placeholder = undefined;
      }
    }
  }
}
