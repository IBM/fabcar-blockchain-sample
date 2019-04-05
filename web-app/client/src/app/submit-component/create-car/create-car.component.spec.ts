import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CreateCarComponent } from './create-car.component';

describe('CreateCarComponent', () => {
  let component: CreateCarComponent;
  let fixture: ComponentFixture<CreateCarComponent>;

  @Component({selector: 'app-create-car-form', template: ''})
  class CreateCarFormStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCarComponent,
        CreateCarFormStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
