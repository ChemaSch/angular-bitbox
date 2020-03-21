import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_URL } from '../config/properties.config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {

    let url = SERVICE_URL + '/countries';

    return this.http.get(url)
      .pipe(
        map( (countriesDB: any) => {
          return countriesDB;
        }),
        catchError(error => {
          return throwError(error);
        })
      )

  }

}
