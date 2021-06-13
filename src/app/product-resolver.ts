import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {ProductService} from './product.service';
import {first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<any> {
  constructor(
    private productService: ProductService,
    private logger: NGXLogger) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.logger.info('Fetching schedules from Backend.');
    return this.productService.getProductMap().pipe(first());
    // reference for doing future changes: https://angular.io/guide/router#resolve-pre-fetching-component-data
  }
}
