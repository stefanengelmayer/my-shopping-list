import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ShoppingRecord} from '../Models/ShoppingRecord';

@Injectable({
  providedIn: 'root'
})
export class PutService {

  private putShoppingListUrl = environment.host + '/api.php/records/shoppinglist'

  constructor(private httpClient: HttpClient) {
  }


  updateDeleted(item: ShoppingRecord) {
    const putShoppingRecordUrl = this.putShoppingListUrl + '/' + item.id
    let formData = new FormData();
    formData.append("deleted", String(item.deleted));
    const sendValue = item.deleted ? 1 : 0;
    this.httpClient.put<any>(putShoppingRecordUrl, "{\"deleted\": \"" + sendValue + "\"}").subscribe(response => {

    });
  }
}
