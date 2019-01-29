import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionComponent } from './production.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductionComponent', () => {
  let component: ProductionComponent;
  let fixture: ComponentFixture<ProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [ ProductionComponent ],
      providers: [{ provide: ActivatedRoute, useValue: {
        params: of(convertToParamMap({}))
      }}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
