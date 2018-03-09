export class LogBo {
  private _id: number;
  private _model: string;
  private _id_modificado: number;
  private _action: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  get id_modificado(): number {
    return this._id_modificado;
  }

  set id_modificado(value: number) {
    this._id_modificado = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }
}
