import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarFormComponent } from './create-car-form.component';

describe('CreateCarFormComponent', () => {
  let component: CreateCarFormComponent;
  let fixture: ComponentFixture<CreateCarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
