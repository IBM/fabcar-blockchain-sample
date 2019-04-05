import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CreateCarFormComponent } from './create-car-form.component';
import { ApiService } from '../../../api.service';

describe('CreateCarFormComponent', () => {
  let component: CreateCarFormComponent;
  let fixture: ComponentFixture<CreateCarFormComponent>;
  let service: ApiService;
  let spy: any;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarFormComponent ],
      imports: [FormsModule],
      providers: [{provide: ApiService, UseValue: service}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new ApiService(http);
    fixture = TestBed.createComponent(CreateCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
