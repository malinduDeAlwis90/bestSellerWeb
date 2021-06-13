import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public checkoutClicked(): void {
    const dialogRef = this.dialog.open(CheckoutComponent);
  }
}
