import { Component, signal } from '@angular/core';
import { NtkMeasure, NtkMeasureResult } from 'ngx-tools-kit';

@Component({
  selector: 'ntk-measure-example',
  standalone: true,
  imports: [NtkMeasure],
  templateUrl: './measure.html',
  styleUrl: './measure.scss',
})
export class Measure {
  iteratee = new Array<void>(100);
  result = signal<NtkMeasureResult>({ duration: 0, timestamp: 0 });
  onMeasure = (result: NtkMeasureResult) => this.result.set(result);
}
