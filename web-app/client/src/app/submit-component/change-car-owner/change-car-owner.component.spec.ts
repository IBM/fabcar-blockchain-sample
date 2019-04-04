import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCarOwnerComponent } from './change-car-owner.component';

describe('ChangeCarOwnerComponent', () => {
  let component: ChangeCarOwnerComponent;
  let fixture: ComponentFixture<ChangeCarOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCarOwnerComponent ]
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
