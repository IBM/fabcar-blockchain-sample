import { Component, OnInit } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-change-car-owner-form',
  templateUrl: './change-car-owner-form.component.html',
  styleUrls: ['./change-car-owner-form.component.scss']
})
export class ChangeCarOwnerFormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async onSubmit(data) {
    console.log(data);
    return await this.apiService.changeCarOwner(data.key, data.newOwner);
  }
}
