import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SERVICE_URL } from '../config/properties.config';
import { Role } from '../enums/role.enum';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private http: HttpClient, private router: Router) {

    this.loadSessionStorage();

  }

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

  // Check if the user is authenticated or not.
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

          // Save the user role in session storage for enable the user tab.
          sessionStorage.setItem('role', response.role);
      }),
      catchError( error => {

        swal.fire('Failed to authenticate user', error.message, 'error');
        return throwError(error.message);
        
      })
    )

  }

  // Logout.
  logout() {

    this.user = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);

  }

  // Check if the user has admin role.
  isAdminRole() {
    return sessionStorage.getItem('role') === Role.admin;
  }

  // Get all users.
  getUsers() {

    let url = SERVICE_URL + '/users';

    return this.http.get(url)
    .pipe(
      map( (usersDB: any) => {        
        return usersDB;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  // Get an user by ID.
  getUser(id: string) {
        
    let url = SERVICE_URL + '/users/' + id;

    return this.http.get(url)
    .pipe(
      map( (userDB: any) => {               
        return userDB;
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
        this.router.navigate(['/users']);
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
        this.router.navigate(['/users']);
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
        return response;

      }),
      catchError( error => {

        swal.fire('The user could not be deleted!', error, 'error');
        return throwError(error);

      })
    )

  }

}
