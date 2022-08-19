export class ShoppingRecord {
  private _id: number = -1;
  private _item_id: number = -1;
  private _deleted: Boolean = false;
  private _item_name: string = '';

  get item_name(): string {
    return this._item_name;
  }

  set item_name(value: string) {
    this._item_name = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get item_id(): number {
    return this._item_id;
  }

  set item_id(value: number) {
    this._item_id = value;
  }

  get deleted(): Boolean {
    return this._deleted;
  }

  set deleted(value: Boolean) {
    this._deleted = value;
  }
}
