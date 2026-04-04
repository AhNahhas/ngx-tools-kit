import { AfterViewChecked, Directive, DoCheck, input } from '@angular/core';

export interface NtkMeasureResult {
  duration: number;
  timestamp: number;
}

@Directive({
  selector: '[ntkMeasure]',
})
export class NtkMeasure implements DoCheck, AfterViewChecked {
  ntkMeasure = input.required<(result: NtkMeasureResult) => void>();
  private start = 0;

  ngDoCheck(): void {
    this.start = performance.now();
  }

  ngAfterViewChecked(): void {
    const callback = this.ntkMeasure();
    callback({
      duration: performance.now() - this.start,
      timestamp: Date.now(),
    });
  }
}
