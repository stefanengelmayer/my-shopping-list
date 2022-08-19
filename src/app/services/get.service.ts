import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemsResponse} from '../Models/ItemsResponse';
import {Observable} from 'rxjs';
import {ShoppingListResponse} from '../Models/ShoppingListResponse'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  private itemsUrl = environment.host + '/api.php/records/items?order=count,desc&order=name,asc';
  private shoppingUrl = environment.host + '/api.php/records/shoppinglist';


  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get the items ordered.
   * They are ordered by how many times they have been added to the list and second by their name.
   */
  getItems(): Observable<ItemsResponse> {
    return this.httpClient.get<ItemsResponse>(this.itemsUrl);
  }

  getShoppingList() {
    return this.httpClient.get<ShoppingListResponse>(this.shoppingUrl);
  }
}
