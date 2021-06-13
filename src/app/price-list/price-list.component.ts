import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../model/product';
import {first} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  public productList: Array<Product>;
  public selectedProduct: Product;
  public priceList: Array<number>;

  constructor(private productService: ProductService, private logger: NGXLogger, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductList();
  }

  public selectProduct(product: Product): void{
    this.selectedProduct = product;
    this.getPriceList(product.key);
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

  private getPriceList(key: string): void {
    this.productService.getPriceList(key).pipe(first()).subscribe(
      priceList => {
        this.priceList = priceList;
      },
      error => {
        this.logger.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      }

    );
  }
}
