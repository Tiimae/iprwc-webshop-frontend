import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserRolesComponent } from './update-user-roles.component';

describe('UpdateUserRolesComponent', () => {
  let component: UpdateUserRolesComponent;
  let fixture: ComponentFixture<UpdateUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
