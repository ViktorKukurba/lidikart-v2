import { ImgLoaderDirective } from './img-loader.directive';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appImgLoader></div>`
})
class TestComponent {}

describe('ImgLoaderDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgLoaderDirective],
      providers: [ChangeDetectorRef]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
