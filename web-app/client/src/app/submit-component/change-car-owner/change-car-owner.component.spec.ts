import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCarOwnerComponent } from './change-car-owner.component';
import { Component } from '@angular/core';

describe('ChangeCarOwnerComponent', () => {
  let component: ChangeCarOwnerComponent;
  let fixture: ComponentFixture<ChangeCarOwnerComponent>;
  @Component({selector: 'app-change-car-owner-form', template: ''})
  class ChangeCarFormStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeCarOwnerComponent,
      ChangeCarFormStubComponent
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
