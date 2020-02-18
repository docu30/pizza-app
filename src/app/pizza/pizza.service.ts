import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Pizza } from './pizza.model';

const baseURL = 'http://localhost:2000/pizza-list';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // private pizzas: Pizza[] = [];
  // private pizzasUpdated = new Subject<Pizza[]>();

  constructor(private http: HttpClient) { }

  getPizzas() {
    return this.http.get(baseURL);
  }

  // getPizzaUpdateListener() {
  //   return this.pizzasUpdated.asObservable();
  // }


}
