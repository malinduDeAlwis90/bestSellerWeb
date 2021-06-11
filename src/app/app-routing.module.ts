import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PriceListComponent} from './price-list/price-list.component';
import {PriceCalculatorComponent} from './price-calculator/price-calculator.component';

const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'home'},
  {path: 'price-list', component: PriceListComponent},
  {path: 'price-calculator', component: PriceCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
