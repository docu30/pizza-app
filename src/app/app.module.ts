import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersListComponent,
    OrderCreateComponent,
    OrderDetailComponent,
    PizzaListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
