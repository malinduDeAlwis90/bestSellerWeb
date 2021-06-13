import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {Product} from './model/product';
import {environment} from '../environments/environment';
import {CartItem} from './model/cart-item';
import {map} from 'rxjs/operators';

const SUFFIX = '/api/products';
const BASE_URL = `${environment.apiUrl}${(SUFFIX)}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private checkoutInfoUrl = BASE_URL + '/checkout-info/';
  private _cart: {[key: string]: CartItem} = {};
  private total: number;

  constructor(private http: HttpClient, private logger: NGXLogger) {
  }

  get cart(): { [key: string]: CartItem } {
    return this._cart;
  }

  public getProductList(): Observable<{[key: string]: Product}> {
    this.logger.info('Getting product list.');
    return this.http.get<{[key: string]: Product}>(BASE_URL);
  }

  public getPriceList(key: string): Observable<Array<number>> {
    this.logger.info('Getting price list. Key: ' + key);
    return this.http.get<Array<number>>(BASE_URL + '/' + key + '/price-list');
  }

  public updateProductCount(change: { key: string; value: number; isUnits: boolean }): void {
    this.logger.info('Updating product count. Key: ' + change.key);
    let cartItem = this._cart[change.key];

    if (!cartItem && change.value > 0) {
      cartItem = {key: change.key} as CartItem;
      this._cart[change.key] = cartItem;
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
    return this.http.post<{prices: {[key: string]: number}, total: number}>(
      this.checkoutInfoUrl, this._cart
    ).pipe(map(response => {
      this.logger.info('Checkout info retrieved successfully.');
      this.handleCheckoutInfo(response.prices, response.total);
      this.logger.info('Checkout info processed successfully.');
    }));
  }

  private handleCheckoutInfo(prices: { [key: string]: number }, total: number): void {
    this.total = total;
    const cart = this._cart;
    for (const key in prices) {
      if (prices.hasOwnProperty(key)) {
        if ( this._cart[key]) {
          this._cart[key].price = prices[key];
        }
      }
    }
  }

  private removeCartItem(key: string): void {
    delete this._cart[key];
  }
}
