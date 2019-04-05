import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAllCarsComponent } from './query-all-cars.component';
import { ApiService } from '../api.service';
import { of, BehaviorSubject } from 'rxjs';

describe('QueryAllCarsComponent', () => {
  let component: QueryAllCarsComponent;
  let fixture: ComponentFixture<QueryAllCarsComponent>;
  const subjectMock = new BehaviorSubject<Array<object>>([{
    Key: 'FAKECAR', Record: {color: 'testColor', make: 'testMake', model: 'testModel', owner: 'testOwner'}}]);

  beforeEach(async(() => {
    const apiServiceStub = {
      cars$: subjectMock.asObservable(),
      queryAllCars() {
        const cars = [{Key: 'FAKECAR', Record: {color: 'testColor', make: 'testMake', model: 'testModel', owner: 'testOwner'}}];
        return of(cars);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ QueryAllCarsComponent ],
      providers: [ {provide: ApiService, useValue: apiServiceStub} ]
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

  it('should contain a table', () => {
    const queryAllCarsElement: HTMLElement = fixture.nativeElement;
    const table = queryAllCarsElement.querySelector('table');
    expect(table);
  });
});
