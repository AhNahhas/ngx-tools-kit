import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NtkMeasure, NtkMeasureResult } from 'ngx-tools-kit';

@Component({
  selector: 'ntk-measure-example',
  standalone: true,
  imports: [NtkMeasure, FormsModule],
  templateUrl: './measure.html',
  styleUrl: './measure.scss',
})
export class Measure {
  forLoop = new Array<void>(100);
  onMeasure = (result: NtkMeasureResult) => console.log(result);
}
