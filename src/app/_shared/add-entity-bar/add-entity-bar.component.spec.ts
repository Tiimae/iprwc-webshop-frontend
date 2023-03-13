import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEntityBarComponent} from './add-entity-bar.component';

describe('AddEntityBarComponent', () => {
  let component: AddEntityBarComponent;
  let fixture: ComponentFixture<AddEntityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEntityBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
