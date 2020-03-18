import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _userService: UserService,
              private router: Router){

  }

  // Check is the user is authenticated or not.
  canActivate(): boolean {
    if(this._userService.isAuthenticated() ) {
      return true;
    } else 
      this.router.navigate(['login']);
  }
  
}
