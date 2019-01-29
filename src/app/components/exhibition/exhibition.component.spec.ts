import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionComponent } from './exhibition.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AppDataService } from '../../services/app-data.service';
import { MockAppDataService } from '../../mocks/app-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExhibitionComponent', () => {
  let component: ExhibitionComponent;
  let fixture: ComponentFixture<ExhibitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionComponent ],
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        {provide: AppDataService, useClass: MockAppDataService},
        {provide: ActivatedRoute, useValue: {
          params: of(convertToParamMap({id: '1'}))
      }}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
