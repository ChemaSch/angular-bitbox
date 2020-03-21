import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SERVICE_URL } from '../config/properties.config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  supplier: Supplier;
  
  constructor(private http: HttpClient, private router: Router) { }


  // Get all suppliers.
  getSuppliers() {

    let url = SERVICE_URL + '/suppliers';

    return this.http.get(url)
      .pipe(
        map( (suppliersDB: any) => {
          return suppliersDB;
        }),
        catchError( error => {
          return throwError(error);
        })
      )

  }

  // Get a supplier.
  getSupplier(id: string) {

    let url = SERVICE_URL + '/suppliers/' + id;

    return this.http.get(url)
    .pipe(
      map( (supplierDB: any) => {               
        return supplierDB;
      }),
      catchError( error => {        
        return throwError(error);
      })
    )

  }

  // Register a supplier.
  saveSupplier(supplier: Supplier) {
    
    let url = SERVICE_URL + '/suppliers';
    
    return this.http.post(url, supplier)
    .pipe(
      map( (response: any) => {

        swal.fire('Supplier created!', supplier.name, 'success');
        this.router.navigate(['/suppliers']);
        return response;

      }),
      catchError( error => {
        swal.fire('Supplier not created!', error, 'error');
        return throwError(error);
      })

    );

  }

  // Update a supplier.
  updateSupplier(supplier: Supplier) {

    let url = SERVICE_URL + '/users/' + supplier.id;

    return this.http.put(url, supplier)
    .pipe(
      map( (response: any) => {
       
        swal.fire('Updated supplier!', supplier.name, 'success');
        this.router.navigate(['/suppliers']);
        return response;

      }),
      catchError( error => {
        swal.fire('Supplier not updated!', error, 'error');
        return throwError(error);
      })
    );

  }

  // Delete a supplier.
  deleteSupplier(id: string) {

    let url = SERVICE_URL + '/suppliers/' + id;

    return this.http.delete( url )
    .pipe(
      map( (response: any) => {

        swal.fire('Supplier deleted!', 'The supplier has been deleted...', 'success')
        return response;

      }),
      catchError( error => {

        swal.fire('The supplier could not be deleted!', error, 'error');
        return throwError(error);

      })
    )

  }


}
