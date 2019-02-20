import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { AppDataService } from '../../../services/app-data.service';
import { MockAppDataService } from '../../../mocks/app-data.service';
import { ImgLoaderDirective } from '../../../common/directives/img-loader.directive';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent, ImgLoaderDirective ],
      imports: [RouterTestingModule],
      providers: [
        {provide: AppDataService, useClass: MockAppDataService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
