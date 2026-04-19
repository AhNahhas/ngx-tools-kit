import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkLoad } from './bulk-load';

describe('BulkLoad', () => {
  let component: BulkLoad;
  let fixture: ComponentFixture<BulkLoad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkLoad],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkLoad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
