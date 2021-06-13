import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
  }

  public checkoutClicked(): void {
    const dialogRef = this.dialog.open(CheckoutComponent);
  }

  public clearClicked(): void {
    this.productService.clearCart();
  }
}
