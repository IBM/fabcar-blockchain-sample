import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
    'Accept': 'text/plain'
  }),
};

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

const baseURL = `http://localhost:8081`;
const queryAllCarsURL = `/queryAllCars`;
const createCarURL = `/createCar`;
const changeCarOwnerURL = `/changeCarOwner`;

@Injectable()
export class ApiService {

  public cars$: Subject<Array<object>> = new BehaviorSubject<Array<object>>([]);

  constructor(private http: HttpClient) {
  }

  createCar(color: string, make: string, model: string, owner: string) {
    return this.http.post(baseURL + createCarURL, ({
      'make': make,
      'model': model,
      'color': color,
      'owner': owner
    }), {headers}).toPromise().then((result) => { this.queryAllCars(); });

  }

  changeCarOwner(key: string, newOwner: string) {
    return this.http.post(baseURL + changeCarOwnerURL, {'key': key, 'newOwner': newOwner},
    {headers}).toPromise().then((result) => { this.queryAllCars(); });
  }

  queryAllCars() {
    return this.http.get<Array<any>>(baseURL + queryAllCarsURL, httpOptionsJson).subscribe((response) => {
      this.cars$.next(response);
    });
  }
}
