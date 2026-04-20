import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Measure } from './measure';

describe('Measure', () => {
  let component: Measure;
  let fixture: ComponentFixture<Measure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Measure],
    }).compileComponents();

    fixture = TestBed.createComponent(Measure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
