import { AppRoutingModule } from './app-routing.module';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockRouter } from '../mocks/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      // providers: [{
      //   provide: Router, useClass: MockRouter
      // }]
    });
    appRoutingModule = new AppRoutingModule(TestBed.get(Router));
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
