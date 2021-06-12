import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {Product} from './model/product';
import {environment} from '../environments/environment';

const SUFFIX = '/api/products';
const BASE_URL = `${environment.apiUrl}${(SUFFIX)}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private priceListUrl = BASE_URL + '/price-list/';

  constructor(private http: HttpClient, private logger: NGXLogger) { // todo logs ect
  }

  public getProductList(): Observable<Array<Product>> {
    this.logger.info('Getting product list.');
    return this.http.get<Array<Product>>(BASE_URL);
  }

  public getPriceList(key: string): Observable<Array<number>> {
    this.logger.info('Getting price list. Key: ' + key);
    return this.http.get<Array<number>>(BASE_URL + '/' + key + '/price-list');
  }
}
