import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _userService: UserService) {}

  canActivate() {
    if(this._userService.user.role === Role.admin) {
      return true;
    } else {
      this._userService.logout();
      return false;
    }
    
  }
  
}
