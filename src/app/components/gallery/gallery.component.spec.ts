import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AppDataService } from '../../services/app-data.service';
import { MockAppDataService } from '../../mocks/app-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), RouterTestingModule],
      declarations: [ GalleryComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of(convertToParamMap({serie: '1'}))
        }
      }, {provide: AppDataService, useClass: MockAppDataService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
