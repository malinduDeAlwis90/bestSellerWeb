import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {first} from 'rxjs/operators';
import {ProductService} from '../product.service';
import {NGXLogger} from 'ngx-logger';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent implements OnInit {

  public productMap = this.productService.productMap;
  public cart = this.productService.cart;

  constructor(private productService: ProductService, private logger: NGXLogger, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public productCountChanged(change: {key: string, value: number , isUnits: boolean}): void {
    this.productService.updateProductCount(change);
  }
}
