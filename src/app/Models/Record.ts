
export class ItemRecord {
  private _id: number = -1;
  private _name: string = '';
  private _count: number = -1

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get count(): number {
    return this._count;
  }

  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set count(value: number) {
    this._count = value;
  }

  constructor(){
  }
}
