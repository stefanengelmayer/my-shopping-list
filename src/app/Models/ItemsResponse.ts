import {ItemRecord} from './Record';

export class ItemsResponse {
  records: ItemRecord[];

  constructor(records: ItemRecord[]) {
    this.records = records
  }
}
