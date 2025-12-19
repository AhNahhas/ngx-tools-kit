import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToolsKit } from './ngx-tools-kit';

describe('NgxToolsKit', () => {
  let component: NgxToolsKit;
  let fixture: ComponentFixture<NgxToolsKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxToolsKit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxToolsKit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
