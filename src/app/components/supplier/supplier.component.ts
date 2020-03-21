import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { Supplier } from '../../models/supplier.model';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier = new Supplier();
  isNewSupplier: boolean = true;
  countries: Country[] = [];

  country = this.countries[0]; // Tengo el país seleccionado, ahora tengo que ponerlo dentro de supplier.

  constructor(private _countryService: CountryService,
              private _supplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.existSupplier(id);
    this.getCountries();

  }

  // Check if the option is new supplier or update supplier.
  existSupplier(id: string) {

    if(id !== 'new') {
      this.getSupplier(id);
      this.isNewSupplier = false;
    } else {
      this.isNewSupplier = true;
    }

  }

  // Get a supplier.
  getSupplier(id: string) {
    this._supplierService.getSupplier(id).subscribe(supplier => this.supplier = supplier);
  }

  // Register a new supplier.
  saveSupplier(supplier: Supplier) {
    this._supplierService.saveSupplier(supplier).subscribe();
  }

  // Update an existing supplier.
  updateSupplier(supplier: Supplier) {
    this._supplierService.updateSupplier(supplier).subscribe(supplier => this.supplier = supplier);
  }

  // Get all countries to associate with a supplier.
  getCountries() {
    this._countryService.getCountries().subscribe(countries => this.countries = countries);
  }

  saveOrUpdate( f: NgForm ) {
    
    if(f.invalid) { return; }
    
    let request: Observable<any>;

    // If exist user, call to updateUser method. If not, call to saveUser.
    if( this.supplier.id ) {
      request = this._supplierService.updateSupplier(this.supplier);
    } else {
      request = this._supplierService.saveSupplier(this.supplier);
    }
    
    request.subscribe();

  }

}
