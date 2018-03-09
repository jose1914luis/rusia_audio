export class GeneralBo {
  private _id: number;
  private _name: string;
  private _descripcion: string;
  private _imagenes: string;
  private _score: number;
  private _apartado: string;
  private _es_gratis: number;
  private _audio_name: string;
  private _calificado: number;
  private _audio: string;
  private _write_date: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get imagenes(): string {
    return this._imagenes;
  }

  set imagenes(value: string) {
    this._imagenes = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get apartado(): string {
    return this._apartado;
  }

  set apartado(value: string) {
    this._apartado = value;
  }

  get es_gratis(): number {
    return this._es_gratis;
  }

  set es_gratis(value: number) {
    this._es_gratis = value;
  }

  get audio_name(): string {
    return this._audio_name;
  }

  set audio_name(value: string) {
    this._audio_name = value;
  }

  get calificado(): number {
    return this._calificado;
  }

  set calificado(value: number) {
    this._calificado = value;
  }

  get audio(): string {
    return this._audio;
  }

  set audio(value: string) {
    this._audio = value;
  }

  get write_date(): string {
    return this._write_date;
  }

  set write_date(value: string) {
    this._write_date = value;
  }

  /*
  public static Boolean exist(number id, string apartado, SQLiteDatabase db){
      string query = "select id_odoo from lugares where id_odoo = " + id + " and apartado = '" + apartado + "'";
      Cursor c = db.rawQuery(query, null);
      boolean result = false;
      if(c.moveToFirst())
          result = true;
      c.close();
      return result;
  }
  */
}
