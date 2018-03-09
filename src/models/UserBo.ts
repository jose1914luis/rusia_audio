export class UserBo {
  private _id: number;
  private _login: string;
  private _name: string;
  private _displayName: string;
  private _email: string;
  private _is_cliente: boolean;
  private _image: string;
  private _profile: number;

  constructor(obj = null) {
    if (!obj) {
      return;
    }
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get is_cliente(): boolean {
    return this._is_cliente;
  }

  set is_cliente(value: boolean) {
    this._is_cliente = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get profile(): number {
    return this._profile;
  }

  set profile(value: number) {
    this._profile = value;
  }
}
