import { Component, OnInit } from '@angular/core';

import { CreateCarComponent } from './create-car/create-car.component';
import { ChangeCarOwnerComponent } from './change-car-owner/change-car-owner.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor() { }

  showCreateCar = true;

  ngOnInit() {
  }

  toggle(tabName) {
    if (tabName === 'change') {
      this.showCreateCar = false;
    }
    if (tabName === 'create') {
      this.showCreateCar = true;
    }
  }
}
