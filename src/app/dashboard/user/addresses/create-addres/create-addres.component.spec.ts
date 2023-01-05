import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddresComponent } from './create-addres.component';

describe('CreateAddresComponent', () => {
  let component: CreateAddresComponent;
  let fixture: ComponentFixture<CreateAddresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
