import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NtkPersistentHost } from './ntk-persistent-host.component';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { NtkComponentOutlet } from './ntk-component-outlet.directive';

@Component({
  selector: 'ntk-first-child',
  template: `{{ binding() }}`,
})
class FirstChildComponent {
  binding = signal('firstText');
}

@Component({
  selector: 'ntk-second-child',
  template: `{{ binding() }}`,
})
class SecondChildComponent {
  binding = signal('secondText');
}

@Component({
  imports: [NtkPersistentHost, NtkComponentOutlet],
  template: `
    <ntk-persistent-host>
      <ng-container *ntkComponentOutlet="currentComponent()"></ng-container>
    </ntk-persistent-host>
  `,
})
class TestComponent {
  currentComponent = signal(FirstChildComponent);
  toggle(): void {
    this.currentComponent.update(cmp =>
      cmp == FirstChildComponent ? SecondChildComponent : FirstChildComponent
    );
  }
}

describe('NtkPersistentHost', () => {
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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject projected components', () => {
    const projected = fixture.debugElement.children;
    expect(projected.length).toBeGreaterThan(0);
  });

  it('should persist component', () => {
    //get first component
    const persistentHost = fixture.debugElement.children[0];

    //modify it's binding + toggle
    let projected = persistentHost.children[0].componentInstance;
    projected.binding.set('otherFirstText');

    //toggle/untoggle
    component.currentComponent.set(SecondChildComponent);
    component.currentComponent.set(FirstChildComponent);

    //binding should be saved
    projected = persistentHost.children[0].componentInstance;
    expect(projected.binding()).toEqual('otherFirstText');
  });

  it('should persist both component', () => {
    //get first component
    const persistentHost = fixture.debugElement.children[0];

    //modify it's binding + toggle for first component
    let projected = persistentHost.children[0].componentInstance;
    projected.binding.set('otherFirstText');
    fixture.detectChanges();

    //toggle
    component.toggle();
    fixture.detectChanges();

    //verify there is only one child
    expect(persistentHost.children.length).toEqual(1);

    //modify it's binding + toggle for second component
    projected = persistentHost.children[0].componentInstance;
    projected.binding.set('otherSecondText');
    fixture.detectChanges();

    //toggle back
    component.toggle();
    fixture.detectChanges();

    //verify there is only one child
    expect(persistentHost.children.length).toEqual(1);

    //verify first component
    projected = persistentHost.children[0].componentInstance;
    expect(projected.binding()).toEqual('otherFirstText');

    //verify second component
    component.toggle();
    fixture.detectChanges();
    projected = persistentHost.children[0].componentInstance;
    expect(projected.binding()).toEqual('otherSecondText');
  });
});
