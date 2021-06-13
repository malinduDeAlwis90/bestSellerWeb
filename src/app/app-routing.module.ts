import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PriceListComponent} from './price-list/price-list.component';
import {PriceCalculatorComponent} from './price-calculator/price-calculator.component';
import {ProductResolver} from './product-resolver';

const routes: Routes = [
  {path: '',
    children: [
      {path: 'price-list', component: PriceListComponent},
      {path: 'price-calculator', component: PriceCalculatorComponent},
      {path:  '**', pathMatch:  'full', redirectTo:  'price-list'},
    ],
    resolve: {
      products: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
