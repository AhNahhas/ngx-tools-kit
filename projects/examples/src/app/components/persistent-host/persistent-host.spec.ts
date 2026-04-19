import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersistentHost } from './persistent-host';

describe('PersistentHost', () => {
  let component: PersistentHost;
  let fixture: ComponentFixture<PersistentHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersistentHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PersistentHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
