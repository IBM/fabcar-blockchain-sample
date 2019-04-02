import { TestBed } from '@angular/core/testing';

import { QueryAllCarsService } from './query-all-cars.service';

describe('QueryAllCarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryAllCarsService = TestBed.get(QueryAllCarsService);
    expect(service).toBeTruthy();
  });
});
