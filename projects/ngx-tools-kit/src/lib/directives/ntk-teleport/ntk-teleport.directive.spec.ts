import { Component, ComponentRef, provideZonelessChangeDetection, signal } from '@angular/core';
import { NtkTeleport } from './ntk-teleport.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  imports: [NtkTeleport], 
  template: `
      <div class="target"></div>
      <div class="origin">
        <p [ntkTeleport]="target()">Should teleport</p>
      </div>
      <div class="otherTarget"></div>
  `,
})
class TestComponent { 
  target = signal('.target');
}

describe('NtkTeleport', () => {
  let component: TestComponent;
  let componentRef: ComponentRef<TestComponent>;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
        providers: [provideZonelessChangeDetection()],
      })
      .compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      componentRef = fixture.componentRef;
      fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should teleport paragraph to target div', () => {
    const elements = fixture.debugElement.children;

    const targetParagraph = elements[0].query(By.css('p'));
    expect(targetParagraph.nativeElement.textContent).toBe('Should teleport');

    const originDiv = elements[1].nativeElement as HTMLDivElement;
    expect(originDiv.querySelector('p')).toBeNull();
    expect(originDiv.childNodes.length).toBe(1);
    expect(originDiv.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    expect(originDiv.childNodes[0].textContent).toContain('ntkTeleport-.target');
  });

  it('should teleport to other target when target changes', () => {
    //knowing
    const elements = fixture.debugElement.children;
    const originDiv = elements[1].nativeElement as HTMLDivElement;

    //when
    component.target.set('.otherTarget');
    fixture.detectChanges(); 

    //then
    const otherTargetParagraph = elements[2].query(By.css('p'));
    expect(otherTargetParagraph.nativeElement.textContent).toBe('Should teleport');

    expect(originDiv.querySelector('p')).toBeNull();
    expect(originDiv.childNodes.length).toBe(1);
    expect(originDiv.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    expect(originDiv.childNodes[0].textContent).toContain('ntkTeleport-.otherTarget');
  });
});
