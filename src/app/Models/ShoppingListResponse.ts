import {ShoppingRecord} from './ShoppingRecord';

export class ShoppingListResponse {
  records: ShoppingRecord[];

  constructor(records: ShoppingRecord[]) {
    this.records = records
  }
}
