import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-query-all-cars',
  templateUrl: './query-all-cars.component.html',
  styleUrls: ['./query-all-cars.component.scss']
})
export class QueryAllCarsComponent implements OnInit {

  private cars: Array<object>;
  response;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.cars$.subscribe((carsArray) => {
      this.cars = carsArray;
    });
    this.apiService.queryAllCars();
  }
}
