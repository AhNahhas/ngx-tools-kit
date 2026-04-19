import { Component, computed, input, signal, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NtkPersistentHost, NtkComponentOutlet } from 'ngx-tools-kit';

@Component({
  selector: 'ntk-persistent-host-input-one',
  imports: [FormsModule],
  template: `
    <div class="mb-3">
      <label for="input-one" class="form-label">Input One</label>
      <input
        type="email"
        class="form-control"
        id="input-one"
        [(ngModel)]="binding"
        [placeholder]="placeholder()" />
    </div>
  `,
})
export class InputOneHost {
  placeholder = input<string>('input one');
  binding = signal<string>('');
}

@Component({
  selector: 'ntk-persistent-host-input-two',
  imports: [FormsModule],
  template: `
    <div class="mb-3">
      <label for="input-two" class="form-label">Input Two</label>
      <input
        type="email"
        class="form-control"
        id="input-two"
        [(ngModel)]="binding"
        [placeholder]="placeholder()" />
    </div>
  `,
})
export class InputTwoHost {
  placeholder = input<string>('input two');
  binding = signal<string>('');
}

@Component({
  selector: 'ntk-persistent-host-example',
  standalone: true,
  imports: [NtkPersistentHost, NtkComponentOutlet],
  templateUrl: './persistent-host.html',
  styleUrl: './persistent-host.scss',
})
export class PersistentHost {
  currentIndex = signal<number>(0);
  components = signal<Type<unknown>[]>([InputOneHost, InputTwoHost]);
  componentInputs = signal<string[]>(['Input One Placeholder', 'Input Two Placeholder']);
  currentComponent = computed(() => this.components()[this.currentIndex()]);
  currentComponentInput = computed(() => this.componentInputs()[this.currentIndex()]);

  switchComponent(index: number): void {
    this.currentIndex.set(index);
  }
}
