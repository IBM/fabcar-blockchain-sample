import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAllCarsComponent } from './query-all-cars.component';

describe('QueryAllCarsComponent', () => {
  let component: QueryAllCarsComponent;
  let fixture: ComponentFixture<QueryAllCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAllCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAllCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
