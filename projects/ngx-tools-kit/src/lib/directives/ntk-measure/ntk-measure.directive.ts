import { AfterViewInit, Directive, input } from '@angular/core';

export interface NtkMeasureResult {
  duration: number;
  timestamp: number;
}

@Directive({
  selector: '[ntkMeasure]',
})
export class NtkMeasure implements AfterViewInit {
  ntkMeasure = input.required<(result: NtkMeasureResult) => unknown>();
  private start = 0;

  constructor() {
    this.start = performance.now();
  }

  ngAfterViewInit(): void {
    const callback = this.ntkMeasure();
    callback({
      duration: performance.now() - this.start,
      timestamp: Date.now(),
    });
  }
}
