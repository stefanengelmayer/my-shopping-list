import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faCircleCheck, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {faArrowsRotate, faCheck} from '@fortawesome/free-solid-svg-icons';
import {GetService} from '../../services/get.service';
import {ItemRecord} from '../../Models/Record'
import {PostService} from '../../services/post.service';
import {ItemsResponse} from '../../Models/ItemsResponse';
import {ShoppingRecord} from '../../Models/ShoppingRecord';
import {PutService} from '../../services/put.service';
import {DeleteService} from '../../services/delete.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCheck = faCheck;
  faArrowsRotate = faArrowsRotate
  items: ItemRecord[] = [];
  shoppingItems: ShoppingRecord[] = []
  @ViewChild('newItem') newItem: ElementRef

  constructor(private getService: GetService, newItem: ElementRef, private postService: PostService,
              private putService: PutService, private deleteService: DeleteService) {
    this.newItem = newItem
  }

  ngOnInit(): void {
    this.getItemSuggestions().subscribe(response => {
      this.updateItemSuggestions(response);
      this.updateShoppingList();
    })
  }

  /**
   * Adds the new item to the items list and the shopping list.
   * This method gets invoked by a button click.
   */
  addItem() {
    const itemName = this.newItem.nativeElement.value.trimEnd();
    if (itemName == '') return false;
    if (this.items.filter(item => item.name == itemName).length == 0) {
      this.postService.addItem(itemName).subscribe(() => {
        this.getItemSuggestions().subscribe(response => {
          this.updateItemSuggestions(response);
          this.addToShoppingList(itemName)?.subscribe(() => {
            this.updateShoppingList();
          });
          this.newItem.nativeElement.value = '';
        })
      })
      return false;
    } else {
      this.addToShoppingList(itemName)?.subscribe(() => {
        this.updateShoppingList();
      });
      this.newItem.nativeElement.value = '';
      return false;
    }
  }

  /**
   * Get the item entry of the items array and forward it to the postService.
   * @param itemName The name of the item, which has to be added to the shopping list.
   * @private
   */
  private addToShoppingList(itemName: string) {
    let itemRecord = this.items.find(item => item.name == itemName);
    return this.postService.addToShoppingList(itemRecord)
  }

  /**
   * Clears the item array and add all received items from the response of ItemsResponse.
   * @param response The received items from the backend.
   * @private
   */
  private updateItemSuggestions(response: ItemsResponse) {
    if (response.records.length > 0) {
      this.items = [];
    }
    for (let responseItem of response.records) {
      let item = new ItemRecord();
      item.id = responseItem.id
      item.name = responseItem.name
      item.count = responseItem.count
      this.items.push(item)
    }
  }

  /**
   * Updates the shoppingItems from the backend and sorts them by their item_name.
   * @private
   */
  private updateShoppingList() {
    this.shoppingItems = [];
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

  /**
   * Calls a function in the GetService to obtain the items from the backend.
   */
  getItemSuggestions() {
    return this.getService.getItems()
  }

  /**
   * Returns either a faCheck if the item is deleted or a faCircleCheck if the item is not marked as deleted in the list.
   * @param item The clicked ShoppingRecord
   */
  getIcon(item: ShoppingRecord): IconDefinition {
    return item.deleted ? faCheck : faCircleCheck
  }

  /**
   * Changes the deleted attribute of the clicked ShoppingRecord.
   * @param item The clicked ShoppingRecord.
   */
  toggleDeleted(item: ShoppingRecord) {
    item.deleted = !item.deleted;
    this.putService.updateDeleted(item)
  }

  /**
   * Adds a class to the div if the item is marked as deleted.
   * @param item The ShoppingRecord entry.
   */
  getClassDeleted(item: ShoppingRecord) {
    return item.deleted ? "deleted" : ""
  }

  /**
   * Used to manually trigger the update of the shopping list.
   */
  reloadShoppingList() {
    this.updateShoppingList()
  }

  /**
   * Removes all database entries in the 'shoppinglist' table.
   */
  removeDeleted() {
    let ids = [];
    for (let item of this.shoppingItems) {
      if (item.deleted) {
        ids.push(item.id)
      }
    }
    this.deleteService.deleteShoppingListEntries(ids).subscribe(() => {
      this.updateShoppingList();
    })
  }
}
