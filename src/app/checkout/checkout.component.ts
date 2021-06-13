import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {NGXLogger} from 'ngx-logger';
import {CartItem} from '../model/cart-item';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public productMap = this.productService.productMap;
  public cart: { items: { [p: string]: CartItem }; total: number } = this.productService.cart;

  constructor(private productService: ProductService, private logger: NGXLogger, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCheckoutInfo();
  }

  private getCheckoutInfo(): void {
    this.productService.getCheckoutInfo().subscribe(
      response => {
      },
      error => {
        this.logger.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      }
    );
  }
}
