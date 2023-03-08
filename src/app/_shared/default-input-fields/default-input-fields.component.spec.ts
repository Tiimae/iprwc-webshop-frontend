import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputFieldsComponent } from './default-input-fields.component';

describe('DefaultInputFieldsComponent', () => {
  let component: DefaultInputFieldsComponent;
  let fixture: ComponentFixture<DefaultInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
