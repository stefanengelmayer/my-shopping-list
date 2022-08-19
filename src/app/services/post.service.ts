import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemRecord} from '../Models/Record';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postItemsUrl = environment.host + '/api.php/records/items';
  private postShoppingUrl = environment.host + '/api.php/records/shoppinglist';

  constructor(private httpClient: HttpClient) {
  }


  addItem(itemName: string) {
    let formData = new FormData();
    formData.append("name", itemName);
    return this.httpClient.post(this.postItemsUrl, formData);
  }

  addToShoppingList(itemRecord: ItemRecord | undefined) {
    if (itemRecord == undefined) return;
    let formData = new FormData();
    formData.append("item_id", itemRecord.id.toString());
    return this.httpClient.post(this.postShoppingUrl, formData);
  }
}
