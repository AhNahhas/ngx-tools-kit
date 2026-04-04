import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NtkMeasure, NtkMeasureResult } from './ntk-measure.directive';

@Component({
  standalone: true,
  imports: [NtkMeasure],
  template: `<div [ntkMeasure]="onMeasure"></div>`,
})
class TestComponent {
  measureResult?: NtkMeasureResult;
  onMeasure = (result: NtkMeasureResult) => (this.measureResult = result);
}

describe('NtkMeasure', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should report render duration when the view is checked', () => {
    fixture.detectChanges();
    expect(component.measureResult).toBeDefined();
    expect(component.measureResult!.duration).toBeGreaterThanOrEqual(0);
    expect(typeof component.measureResult!.timestamp).toBe('number');
  });
});
