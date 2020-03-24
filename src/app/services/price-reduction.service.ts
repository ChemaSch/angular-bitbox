import { Injectable } from "@angular/core";
import { Price_Reduction } from "../models/price_reduction.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SERVICE_URL } from "../config/properties.config";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class PriceReductionService {
  price_reduction: Price_Reduction;

  constructor(private http: HttpClient, private router: Router) {}

  // Get all price reductions.
  getPriceReductions() {
    let url = SERVICE_URL + "/price_reductions";

    return this.http.get(url).pipe(
      map((priceReductionsDB: any) => {        
        return priceReductionsDB;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Get a price reduction.
  getPriceReduction(id: string) {
    let url = SERVICE_URL + "/price_reductions/" + id;

    return this.http.get(url).pipe(
      map((priceReductionDB: any) => {
        return priceReductionDB;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Register a price reduction.
  savePriceReduction(price_Reduction: Price_Reduction) {
    let url = SERVICE_URL + "/price_reductions";

    return this.http.post(url, price_Reduction).pipe(
      map((response: any) => {
        swal.fire("Price reduction created!", "", "success");
        this.router.navigate(["/price_reductions"]);
        return response;
      }),
      catchError(error => {
        swal.fire("Price reduction not created!", error, "error");
        return throwError(error);
      })
    );
  }
}
