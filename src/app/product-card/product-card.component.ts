import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {CartItem} from '../model/cart-item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: Product;
  @Input()
  public cartItem: CartItem;
  @Output()
  public productCountChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public countChanged(value: number, isUnits: boolean): void {
    this.productCountChanged.emit({key: this.product.key, value , isUnits});
  }
}
