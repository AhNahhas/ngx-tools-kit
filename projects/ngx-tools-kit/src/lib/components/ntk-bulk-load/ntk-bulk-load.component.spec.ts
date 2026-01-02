import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NtkBulkLoad } from './ntk-bulk-load.component';
import {
  Component,
  effect,
  inject,
  input,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { NtkBulkLoadable } from './ntk-bulk-loadable.directive';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ntk-first-component',
  template: `<p>First Has Loaded</p>`,
})
class FirstComponent {
  state = input.required<boolean>();
  loadable = inject(NtkBulkLoadable);

  constructor() {
    effect(() => this.loadable.markReady(this.state()));
  }
}

@Component({
  selector: 'ntk-second-component',
  template: `<p>Second Has Loaded</p>`,
})
class SecondComponent {
  state = input.required<boolean>();
  loadable = inject(NtkBulkLoadable);

  constructor() {
    effect(() => this.loadable.markReady(this.state()));
  }
}

@Component({
  imports: [FirstComponent, SecondComponent, NtkBulkLoad, NtkBulkLoadable],
  template: `
    <ntk-bulk-load>
      <ntk-first-component ntkBulkLoadable [state]="firstState()"></ntk-first-component>
      <ntk-second-component ntkBulkLoadable [state]="secondState()"></ntk-second-component>
      <p ntkBulkPending>Loading...</p>
    </ntk-bulk-load>
  `,
})
class TestComponent {
  firstState = signal<boolean>(false);
  secondState = signal<boolean>(false);
}

describe('NtkBulkLoad', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pending template', () => {
    const parentHost = fixture.debugElement.children[0];
    const paragraph: HTMLParagraphElement = parentHost.nativeElement;
    expect(paragraph.innerHTML).toContain('Loading');
  });

  it('should still show pending template', () => {
    //knowing
    const parentHost = fixture.debugElement;
    const parentComponent = parentHost.componentInstance;

    //when
    parentComponent.firstState.set(true);
    fixture.detectChanges();

    //then
    const paragraph: HTMLParagraphElement = parentHost.nativeElement;
    expect(paragraph.innerHTML).toContain('Loading');
  });

  it('should show projected content', () => {
    //knowing
    const parentHost = fixture.debugElement;
    const parentComponent = parentHost.componentInstance;

    //when
    parentComponent.firstState.set(true);
    parentComponent.secondState.set(true);
    fixture.detectChanges();

    //then
    const paragraphs = parentHost.queryAll(By.css('p'));
    const firstParagraph: HTMLParagraphElement = paragraphs[0].nativeElement;
    const secondParagraph: HTMLParagraphElement = paragraphs[1].nativeElement;
    expect(firstParagraph.innerHTML).toContain('First Has Loaded');
    expect(secondParagraph.innerHTML).toContain('Second Has Loaded');
  });
});
