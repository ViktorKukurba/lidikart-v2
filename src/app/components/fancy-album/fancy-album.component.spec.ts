import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { FancyAlbumComponent } from './fancy-album.component';
import { MockRouter } from '../../mocks/router';
import { ImgLoaderDirective } from '../../common/directives/img-loader.directive';
import { ImgUrlPipe } from '../../common/pipes/img-url.pipe';

describe('FancyAlbumComponent', () => {
  let component: FancyAlbumComponent;
  let fixture: ComponentFixture<FancyAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyAlbumComponent, ImgLoaderDirective, ImgUrlPipe ],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: {
          params: of(convertToParamMap({})),
          url: of([{path: ''}])
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyAlbumComponent);
    component = fixture.componentInstance;
    component.items = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
