import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pizza } from './../pizza.model';
import { PizzaService } from './../pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  pizzas: any = [];
  //private pizzaSub: Subscription;
  constructor(public pizzaService: PizzaService) { }


  ngOnInit() {
    this.pizzaService.getPizzas()
    .subscribe((pizzas: Pizza[]) => {
      this.pizzas = pizzas;
    },
    error => {
      console.log(error);
    });
  }

}
