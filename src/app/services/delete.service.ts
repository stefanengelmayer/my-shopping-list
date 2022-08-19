import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private deleteShoppingEntryUrl = environment.host + '/api.php/records/shoppinglist';
  private deleteItemEntryUrl = environment.host + '/api.php/records/items'

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Sends the request to delete all passed ids as a number array.
   * @param ids The ids of the shoppinglist, which should be deleted in the database.
   */
  deleteShoppingListEntries(ids: number[]) {
    let idString = '/'
    ids.forEach(id => idString = idString + id + ',');
    idString.substring(0, idString.length - 2)
    const deleteEntryUrl = this.deleteShoppingEntryUrl + idString
    return this.httpClient.delete(deleteEntryUrl)
  }

  /**
   * Sends the request to delete all passed items if they are not in use.
   * @param id The id of the item, which should to be deleted in the database.
   */
  deleteItem(id: number) {
    return this.httpClient.delete(this.deleteItemEntryUrl + '/' + id)
  }
}
