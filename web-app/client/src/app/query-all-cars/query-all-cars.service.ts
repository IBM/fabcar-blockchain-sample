import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class QueryAllCarsService {

  constructor(private apiService: ApiService) { }

  queryAllCars() {
    return this.apiService.queryAllCars();
  }
}
