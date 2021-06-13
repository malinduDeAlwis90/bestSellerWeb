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

  public productList: Array<Product>;

  constructor(private productService: ProductService, private logger: NGXLogger, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList(): void {
    this.productService.getProductList().pipe(first()).subscribe(
      productList => {
        this.productList = productList;
      },
      error => {
        this.logger.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      }

    );
  }

  public productCountChanged(change: {key: string, value: number , isUnits: boolean}): void {
    this.productService.updateProductCount(change);
  }
}
