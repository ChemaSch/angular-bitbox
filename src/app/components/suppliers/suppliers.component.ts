import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/supplier.model';
import { SupplierService } from '../../services/supplier.service';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];

  constructor(private _supplierService: SupplierService) { }

  ngOnInit(): void {

    this.getSuppliers();

  }

  // Get all suppliers.
  getSuppliers() {
    this._supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
  }

  // Delete a supplier.
  deleteSupplier(supplier: Supplier) {
    this._supplierService.deleteSupplier(supplier.id).subscribe();
  }

}
