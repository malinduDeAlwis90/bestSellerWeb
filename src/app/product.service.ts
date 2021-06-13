import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {Product} from './model/product';
import {environment} from '../environments/environment';
import {CartItem} from './model/cart-item';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

const SUFFIX = '/api/products';
const BASE_URL = `${environment.apiUrl}${(SUFFIX)}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private checkoutInfoUrl = BASE_URL + '/checkout-info/';
  private _cart: { items: {[key: string]: CartItem}, total: number } = {items: {}, total: 0};
  private _productMap: {[key: string]: Product} = {};

  constructor(private http: HttpClient, private logger: NGXLogger, private snackBar: MatSnackBar) {
  }

  get cart(): { items: {[key: string]: CartItem}, total: number } {
    return this._cart;
  }

  get productMap(): { [p: string]: Product } {
    return this._productMap;
  }

  public getProductMap(): Observable<void> {
    this.logger.info('Getting product list.');
    return this.http.get<{[key: string]: Product}>(BASE_URL).pipe(map(productMap => {
      this.populateProductMap(productMap);
        // this.productList.length = 0;
        // this.productList = Object.values(productList);
      },
      error => {
        this.logger.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      }
    ));
  }

  public getPriceList(key: string): Observable<Array<number>> {
    this.logger.info('Getting price list. Key: ' + key);
    return this.http.get<Array<number>>(BASE_URL + '/' + key + '/price-list');
  }

  public updateProductCount(change: { key: string; value: number; isUnits: boolean }): void {
    this.logger.info('Updating product count. Key: ' + change.key);
    let cartItem = this._cart.items[change.key];

    if (!cartItem && change.value > 0) {
      cartItem = {key: change.key} as CartItem;
      this._cart.items[change.key] = cartItem;
    }

    if (cartItem) {
      if (change.isUnits) {
        if (!cartItem.cartonCount && !change.value) {
          this.removeCartItem(change.key);
          return;
        }
        cartItem.unitCount = change.value;
      } else {
        if (!cartItem.unitCount && !change.value) {
          this.removeCartItem(change.key);
          return;
        }
        cartItem.cartonCount = change.value;
      }
    }

    this.logger.info('Product count updated successfully.');
  }

  public getCheckoutInfo(): Observable<any> {
    this.logger.info('Getting checkout info.');
    this._cart.total = 0;
    const cartItems = this._cart.items;
    const request = {};

    for (const key in cartItems) {
      if (cartItems.hasOwnProperty(key)) {
        const cartItem = cartItems[key];
        request[key] = {
          key: cartItem.key,
          cartonCount: cartItem.cartonCount,
          unitCount: cartItem.unitCount
        };
      }
    }

    return this.http.post<{prices: {[key: string]: number}, total: number}>(
      this.checkoutInfoUrl, request
    ).pipe(map(response => {
      this.logger.info('Checkout info retrieved successfully.');
      this.handleCheckoutInfo(response.prices, response.total);
      this.logger.info('Checkout info processed successfully.');
    }));
  }

  private handleCheckoutInfo(prices: { [key: string]: number }, total: number): void {
    this._cart.total = total;
    for (const key in prices) {
      if (prices.hasOwnProperty(key)) {
        if ( this._cart.items[key]) {
          this._cart.items[key].price = prices[key];
        }
      }
    }
  }

  private removeCartItem(key: string): void {
    delete this._cart.items[key];
  }

  private populateProductMap(productMap: {[key: string]: Product }): void {
    for (const key in productMap) {
      if (productMap.hasOwnProperty(key)) {
        this._productMap[key] = productMap[key];
      }
    }
  }
}
