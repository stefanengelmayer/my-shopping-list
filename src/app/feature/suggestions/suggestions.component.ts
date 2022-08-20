import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {GetService} from '../../services/get.service';
import {ItemRecord} from '../../Models/Record';
import {DeleteService} from '../../services/delete.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ShoppingRecord} from '../../Models/ShoppingRecord';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  items: ItemRecord[] = []
  faTrash = faTrash
  shoppingItems: ShoppingRecord[] = []

  constructor(private getService: GetService, private deleteService: DeleteService) {
  }

  ngOnInit(): void {
    this.loadList()
    this.loadShoppingList()
  }

  deleteSuggestion(item: ItemRecord) {
    this.deleteService.deleteItem(item.id).subscribe(response => {
      console.log(response);
      if (response instanceof HttpErrorResponse) {
        if (response.status == 409) {
          // TODO show toast notification that item is in use.
        }
      }
      this.loadList()
    })

  }

  loadList() {
    this.items = []
    this.getService.getItems().subscribe(response => {
      for (let responseItem of response.records) {
        let item = new ItemRecord();
        item.id = responseItem.id
        item.name = responseItem.name
        item.count = responseItem.count
        this.items.push(item)
      }
    })
  }

  isNotUsed(item: ItemRecord) {
    for (let shoppingItem of this.shoppingItems) {
      if (shoppingItem.item_id == item.id) {
        return false;
      }
    }
    return true;
  }

  private loadShoppingList() {
    this.getService.getShoppingList().subscribe(response => {
      for (let responseItem of response.records) {
        const item_name: string = this.items.find(el => el.id == responseItem.item_id)!.name
        let item = new ShoppingRecord();
        item.id = responseItem.id
        item.item_id = responseItem.item_id
        item.deleted = responseItem.deleted
        item.item_name = item_name
        this.shoppingItems.push(item)
      }
      this.shoppingItems.sort((a, b) => {
        return (a.item_name < b.item_name) ? -1 : 1
      });
    });
  }

}
