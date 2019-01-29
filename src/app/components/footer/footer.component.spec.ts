import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FooterComponent } from './footer.component';
import { MockRouter } from '../../mocks/router';
import { AppDataService } from '../../services/app-data.service';
import { MockAppDataService } from '../../mocks/app-data.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [ RouterTestingModule, StoreModule.forRoot({...reducers}) ],
      providers: [
        // {provide: Router, useClass: MockRouter },
      {provide: AppDataService, useClass: MockAppDataService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
