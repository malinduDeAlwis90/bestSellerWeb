import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PriceListComponent} from './price-list/price-list.component';
import {PriceCalculatorComponent} from './price-calculator/price-calculator.component';

const routes: Routes = [
  {path: 'price-list', component: PriceListComponent},
  {path: 'price-calculator', component: PriceCalculatorComponent},
  {path:  '**', pathMatch:  'full', redirectTo:  'price-list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
