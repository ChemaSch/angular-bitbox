import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

import swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SERVICE_URL } from '../config/properties.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  loadSessionStorage() {
    if(sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    } else {
      this.user = null;
    }
  }

  // Save in the storage the user info.
  saveSessionStorage(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated() {
     return sessionStorage.getItem('user') != null;
  }

  // Call to the login service.
  login( user: User, remember: boolean = false) {
 
    if(remember) {
      sessionStorage.setItem('name', user.name);
    } else {
      sessionStorage.removeItem('name');
    }

    let url = SERVICE_URL + '/login';
    return this.http.post(url, user)
    .pipe(
      map((response: any) => {        
          this.saveSessionStorage(response);
      }),
      catchError( error => {
        swal.fire('Failed to authenticate user', error.message, 'error');
        return throwError(error.message);
      })
    )

  }

  logout() {

    this.user = null;

    sessionStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

  // Get all users.
  getUsers() {

    let url = SERVICE_URL + '/users';

    return this.http.get(url)
    .pipe(
      map( (response: any) => {
        console.log(response);
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  // Get an user by ID.
  getUser(id: string) {

    let url = SERVICE_URL + '/users/' + id;

    return this.http.get( url )
    .pipe(
      map( (response: any) => {
        console.log(response);
        return response;
      }),
      catchError( error => {        
        return throwError(error);
      })
    )

  }

  // Register an user.
  saveUser(user: User) {

    let url = SERVICE_URL + '/users';

    return this.http.post(url, user)
    .pipe(
      map( (response: any) => {
        swal.fire('User created!', user.name, 'success');
        return response;
      }),
      catchError( error => {
        swal.fire('User not created!', error, 'error');
        return throwError(error);
      })

    );

  }

  // Update an user.
  updateUser(user: User) {

    let url = SERVICE_URL + '/users/' + user.id;

    return this.http.put(url, user)
    .pipe(
      map( (response: any) => {
        
        if(user.id === this.user.id) {          
          this.saveSessionStorage(response);          
        }

        swal.fire('Updated user!', user.name, 'success');
        return response;

      }),
      catchError( error => {
        swal.fire('User not updated!', error, 'error');
        return throwError(error);
      })
    );

  }

  // Delete an user.
  deleteUser( id: string ) {

    let url = SERVICE_URL + '/users/' + id;

    return this.http.delete( url )
    .pipe(
      map( (response: any) => {
        swal.fire('User deleted!', 'The user has been deleted...', 'success')
        return true;
      }),
      catchError( error => {
        swal.fire('The user could not be deleted!', error, 'error');
        return throwError(error);
      })
    )

  }

}
