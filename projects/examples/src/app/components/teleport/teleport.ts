import { Component, signal } from '@angular/core';
import { NtkTeleport } from 'ngx-tools-kit';

@Component({
  selector: 'ntk-teleport-example',
  standalone: true,
  imports: [NtkTeleport],
  templateUrl: './teleport.html',
  styleUrl: './teleport.scss',
})
export class Teleport {
  target = signal<string>('#teleport-target');

  toggle(): void {
    const currentTarget = this.target();
    if (currentTarget === '#teleport-target') {
      this.target.set('#teleport-target-2');
    } else {
      this.target.set('#teleport-target');
    }
  }
}
