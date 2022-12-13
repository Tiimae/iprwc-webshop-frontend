import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUploadedImageComponent } from './show-uploaded-image.component';

describe('ShowUploadedImageComponent', () => {
  let component: ShowUploadedImageComponent;
  let fixture: ComponentFixture<ShowUploadedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUploadedImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUploadedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
