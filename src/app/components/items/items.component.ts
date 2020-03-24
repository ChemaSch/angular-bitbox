import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  detail = "detail";

  admin: string;

  searchItemState = '';

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {

    this.getItems();

  }

  // Check if the user has admin role for enable the delete option in the list.
  isAdmin() {
    this.admin = sessionStorage.getItem('role');
    if(this.admin === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  // Get all items.
  getItems() {
    this._itemService.getItems().subscribe(items => this.items = items);
  }

  // Delete an item.
  deleteItem(item: Item) {
    this._itemService.deleteItem(item.item_code).subscribe();
  }

}
