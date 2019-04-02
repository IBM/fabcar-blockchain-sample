import { Component, OnInit } from '@angular/core';
import { QueryAllCarsService } from './query-all-cars.service';

@Component({
  selector: 'app-query-all-cars',
  templateUrl: './query-all-cars.component.html',
  styleUrls: ['./query-all-cars.component.scss']
})
export class QueryAllCarsComponent implements OnInit {

  response;
  constructor(private queryAllCarsService: QueryAllCarsService) { }

  ngOnInit() {
    this.queryAllCarsService.queryAllCars().subscribe((response: any) => {
      this.response = response;
    });
  }

  async loadCars () {
    const response = await this.queryAllCarsService.queryAllCars();
  }
}
