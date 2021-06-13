import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import { ProductCardComponent } from './product-card/product-card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PriceListComponent,
    PriceCalculatorComponent,
    ProductCardComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: `${BASE_URL}/logs`,
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.INFO
    })
  ],
  providers: [],
  entryComponents: [CheckoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
