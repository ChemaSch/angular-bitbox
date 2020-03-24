import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/item/item.component';

import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PriceReductionsComponent } from './components/price-reductions/price-reductions.component';
import { PriceReductionComponent } from './components/price-reduction/price-reduction.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    UsersComponent,
    UserComponent,
    ItemComponent,
    NavbarComponent,
    ItemsComponent,
    SuppliersComponent,
    SupplierComponent,
    PriceReductionsComponent,
    PriceReductionComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FilterPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
