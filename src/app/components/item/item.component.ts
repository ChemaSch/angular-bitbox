import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { Supplier } from '../../models/supplier.model';
import { ItemService } from '../../services/item.service';
import { SupplierService } from '../../services/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item_State } from '../../enums/item_state.enum';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item = new Item();
  item_states: any[] = []; 

  suppliers: Supplier[] = [];  

  isDetail: boolean;

  update: boolean;

  constructor(private _itemService: ItemService,
              private _supplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const detail = this.route.snapshot.paramMap.get('detail');
    this.isDetailView(detail);    
    
    const item_code = this.route.snapshot.paramMap.get('id');
    this.existItem(item_code);

    this.Item_States();
    this.getSuppliers();
    this.getCreator();

  }

  getCreator() {
    this.item.creator = JSON.parse(sessionStorage.getItem('user'));
  }

  isDetailView(detail: string) {
    if(detail === "detail") {
      this.isDetail = true;
    } else {
      this.isDetail = false;
    }
  }

  // Check if the option is new item or update item.
  existItem(itemCode: string) {

    if(itemCode !== null) {
      this.getItem(itemCode);
      this.update = true;    
    } else {
      this.update = false;
    }
    
  }

  // Register enum item state object into a list to use in a select.
  Item_States() {
    for (let item_state in Item_State) {
      this.item_states.push({text: item_state, value: Item_State[item_state]});
    }
  }

  // Check if the item state is discontinued for enable the reason input text. 
  isDiscontinued() {
    if(this.item.item_state === Item_State.discontinued) {
      return true;
    } else {
      return false;
    }
  }

  // Get an item.
  getItem(itemCode: string) {
    this._itemService.getItem(itemCode).subscribe(item => this.item = item);
  }

  // Register an item.
  saveItem(item: Item) {
    this._itemService.saveItem(item).subscribe();
  }

  // Update an item
  updateitem(item: Item) {
    this._itemService.updateItem(item).subscribe(item => this.item = item);
  }

  getSuppliers() {
    this._supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
  }

  saveOrUpdate( f: NgForm ) {
    
    if(f.invalid) { return; }
    
    let request: Observable<any>;

    // If exist user, call to updateUser method. If not, call to saveUser.
    if( this.update ) {      
      request = this._itemService.updateItem(this.item);
    } else {      
      request = this._itemService.saveItem(this.item);
    }
    
    request.subscribe();

  }

}
