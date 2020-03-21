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
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
