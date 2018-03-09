export class RutasBo {
  private _id: number;
  private _name: string;
  private _audio_name: string;
  private _descripcion: string;
  private _score: number;
  private _distancia: string;
  private _duracion: string;
  private _ruta: string;
  private _es_gratis: number;
  private _precio: string;
  private _calificado: number;
  private _write_date: string;
  private _imagenes: string;
  private _rutas: string;
  private _lugares: string;


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

  get audio_name(): string {
    return this._audio_name;
  }

  set audio_name(value: string) {
    this._audio_name = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get distancia(): string {
    return this._distancia;
  }

  set distancia(value: string) {
    this._distancia = value;
  }

  get duracion(): string {
    return this._duracion;
  }

  set duracion(value: string) {
    this._duracion = value;
  }

  get ruta(): string {
    return this._ruta;
  }

  set ruta(value: string) {
    this._ruta = value;
  }

  get es_gratis(): number {
    return this._es_gratis;
  }

  set es_gratis(value: number) {
    this._es_gratis = value;
  }

  get precio(): string {
    return this._precio;
  }

  set precio(value: string) {
    this._precio = value;
  }

  get calificado(): number {
    return this._calificado;
  }

  set calificado(value: number) {
    this._calificado = value;
  }

  get write_date(): string {
    return this._write_date;
  }

  set write_date(value: string) {
    this._write_date = value;
  }

  get imagenes(): string {
    return this._imagenes;
  }

  set imagenes(value: string) {
    this._imagenes = value;
  }

  get rutas(): string {
    return this._rutas;
  }

  set rutas(value: string) {
    this._rutas = value;
  }

  get lugares(): string {
    return this._lugares;
  }

  set lugares(value: string) {
    this._lugares = value;
  }

  /*
    public static Boolean exist(number id, SQLiteDatabase db){
        string query = "select id_odoo from rutas where id_odoo = " + id;
        Cursor c = db.rawQuery(query, null);
        boolean result = false;
        if(c.moveToFirst())
            result = true;
        c.close();
        return result;
    }
    */
}
