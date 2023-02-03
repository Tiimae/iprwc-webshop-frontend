import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVerifyComponent } from './request-verify.component';

describe('RequestVerifyComponent', () => {
  let component: RequestVerifyComponent;
  let fixture: ComponentFixture<RequestVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestVerifyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
