import { FixedDirective } from './fixed.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppDataService } from '../../services/app-data.service';
import { MockAppDataService } from '../../mocks/app-data.service';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appFixed></div>`
})
class TestComponent {}

describe('FixedDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FixedDirective],
      providers: [{provide: AppDataService, useClass: MockAppDataService}]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
