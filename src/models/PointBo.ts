export class PonumberBo {

  private _lat: number;
  private _lon: number;
  private _name: string;
  private _type: string;
  private _id: number;
  private _score: number;
  private _marker: string;
  private _is_free: number;


  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  get lon(): number {
    return this._lon;
  }

  set lon(value: number) {
    this._lon = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get marker(): string {
    return this._marker;
  }

  set marker(value: string) {
    this._marker = value;
  }

  get is_free(): number {
    return this._is_free;
  }

  set is_free(value: number) {
    this._is_free = value;
  }
}
