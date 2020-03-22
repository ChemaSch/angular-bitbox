import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/item/item.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserComponent } from './components/user/user.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SupplierComponent } from './components/supplier/supplier.component';


const routes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'items', component: ItemsComponent, canActivate: [ AuthGuard ] },
  { path: 'item/new', component: ItemComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'item/:detail/:id', component: ItemComponent },
  { path: 'users', component: UsersComponent, canActivate: [ AdminGuard ] },
  { path: 'user/:id', component: UserComponent, canActivate: [ AdminGuard ] },
  { path: 'user/:detail/:id', component: UserComponent, canActivate: [ AdminGuard ]},
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'supplier/:id', component: SupplierComponent },
  { path: 'supplier/:detail/:id', component: SupplierComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
