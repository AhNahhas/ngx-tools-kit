import { AfterViewChecked, Directive, DoCheck, input } from '@angular/core';

export interface NtkMeasureResult {
  duration: number;
  timestamp: number;
}

@Directive({
  selector: '[ntkMeasure]',
})
export class NtkMeasure implements DoCheck, AfterViewChecked {
  // should be a logger function or risk CD errors
  ntkMeasure = input.required<(result: NtkMeasureResult) => void>();
  private start = 0;

  ngDoCheck(): void {
    this.start = performance.now();
  }

  ngAfterViewChecked(): void {
    // if this functions mutates state then a possible CD error
    this.ntkMeasure()({
      duration: performance.now() - this.start,
      timestamp: Date.now(),
    });
  }
}
