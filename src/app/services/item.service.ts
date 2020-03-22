import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Item } from '../models/item.model';
import { SERVICE_URL } from '../config/properties.config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item: Item;

  constructor(private http: HttpClient, private router: Router) { }

  // Get all items.
  getItems() {

    let url = SERVICE_URL + '/items';

    return this.http.get(url)
      .pipe(
        map( (itemsDB: any) => {
          return itemsDB;
        }),
        catchError( error => {
          return throwError(error);
        })
      )

  }

  // Get an item.
  getItem(id: string) {

    let url = SERVICE_URL + '/items/' + id;

    return this.http.get(url)
    .pipe(
      map( (itemDB: any) => {               
        return itemDB;
      }),
      catchError( error => {        
        return throwError(error);
      })
    )

  }

  // Register an item.
  saveItem(item: Item) {

    let url = SERVICE_URL + '/items';
        
    return this.http.post(url, item)
    .pipe(
      map( (response: any) => {

        swal.fire('Item created!', item.description, 'success');
        this.router.navigate(['/items']);
        return response;

      }),
      catchError( error => {
        swal.fire('Item not created!', error, 'error');
        return throwError(error);
      })

    );

  }

  // Update an item.
  updateItem(item: Item) {

    let url = SERVICE_URL + '/items/' + item.item_code;

    return this.http.put(url, item)
    .pipe(
      map( (response: any) => {
       
        swal.fire('Updated item!', item.description, 'success');
        this.router.navigate(['/items']);
        return response;

      }),
      catchError( error => {
        swal.fire('Item not updated!', error, 'error');
        return throwError(error);
      })
    );

  }

  // Delete an item.
  deleteItem(itemCode: string) {

    let url = SERVICE_URL + '/items/' + itemCode;

    return this.http.delete( url )
    .pipe(
      map( (response: any) => {

        swal.fire('Item deleted!', 'The item has been deleted...', 'success')        
        return response;

      }),
      catchError( error => {

        swal.fire('The item could not be deleted!', error, 'error');
        return throwError(error);

      })
    )

  }

}
