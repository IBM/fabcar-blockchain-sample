import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { SubmitComponent } from './submit.component';

describe('SubmitComponent', () => {
  let component: SubmitComponent;
  let fixture: ComponentFixture<SubmitComponent>;

  @Component({selector: 'app-create-car', template: ''})
  class CreateCarStubComponent {}

  @Component({selector: 'app-change-car-owner', template: ''})
  class ChangeCarOwnerStubComponent {}

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmitComponent,
        CreateCarStubComponent,
        ChangeCarOwnerStubComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showCreateCar to true', () => {
    expect(component.showCreateCar).toEqual(true);
  });

  it('should have a createCar component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-create-car')).toBeTruthy();
  });


  describe('toggle', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
    });

    it('should toggle showChange to true when called with create', () => {
      component.showCreateCar = false;
      component.toggle('create');
      expect(component.showCreateCar).toEqual(true);
    });

    it('should toggle showChange to false when called with change', () => {
      component.showCreateCar = true;
      component.toggle('change');
      expect(component.showCreateCar).toEqual(false);
    });

    it('should not toggle showChange if it is already the desired value', () => {
      component.showCreateCar = true;
      component.toggle('create');
      expect(component.showCreateCar).toEqual(true);

      component.showCreateCar = false;
      component.toggle('change');
      expect(component.showCreateCar).toEqual(false);
    });
  });
});
