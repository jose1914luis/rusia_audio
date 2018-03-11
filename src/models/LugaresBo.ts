import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {LugaresEntry} from "../database/AudioguiaData";
import {ILugar} from "../interface/ILugar";
import {APP_CONFIG} from "../../constants";
import {ImagenesBo} from "./ImagenesBo";

export class LugaresBo {
  constructor(obj = null) {
    if (!obj) {
      return;
    }
    this._id = obj.id;
    this._id_odoo = obj.id_odoo;
    this._name = obj.name;
    this._descripcion = obj.description;
    this._audio_name = obj.audio_name;
    this._score = obj.score;
    this._direccion = obj.direccion;
    this._horario = obj.horario;
    this._precio_entrada = obj.precio_entrada;
    this._latitud = obj.latitud;
    this._longitud = obj.longitud;
    this._tipo = obj.tipo;
    this._comer = obj.comer;
    this._dormir = obj.dormir;
    this._interes = obj.interes;
    this._numbereres = obj.numbereres;
    this._es_gratis = obj.es_gratis;
    this._imagenes = obj.imagenes;
    this._rutas = obj.rutas;
    this._lugares = obj.lugares;
    this._calificado = obj.calificado;
    this._write_date = obj.write_date;
    this._url = obj.url;
    this._icon_marker = obj.icon_marker;
    this._images_bo = new Array();
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }


  private _id_odoo: number;

  get id_odoo(): number {
    return this._id_odoo;
  }

  set id_odoo(value: number) {
    this._id_odoo = value;
  }

  private _name: any;

  get name(): any {
    return this._name;
  }

  set name(value: any) {
    this._name = value;
  }

  private _descripcion: any;

  get descripcion(): any {
    return this._descripcion;
  }

  set descripcion(value: any) {
    this._descripcion = value;
  }

  private _audio_name: string;

  get audio_name(): string {
    return this._audio_name;
  }

  set audio_name(value: string) {
    this._audio_name = value;
  }

  private _score: number;

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  private _direccion: string;

  get direccion(): string {
    return this._direccion;
  }

  set direccion(value: string) {
    this._direccion = value;
  }

  private _horario: string;

  get horario(): string {
    return this._horario;
  }

  set horario(value: string) {
    this._horario = value;
  }

  private _precio_entrada: string;

  get precio_entrada(): string {
    return this._precio_entrada;
  }

  set precio_entrada(value: string) {
    this._precio_entrada = value;
  }

  private _latitud: number;

  get latitud(): number {
    return this._latitud;
  }

  set latitud(value: number) {
    this._latitud = value;
  }

  private _longitud: number;

  get longitud(): number {
    return this._longitud;
  }

  set longitud(value: number) {
    this._longitud = value;
  }

  private _tipo: string;

  get tipo(): string {
    return this._tipo;
  }

  set tipo(value: string) {
    this._tipo = value;
  }

  private _comer: number;

  get comer(): number {
    return this._comer;
  }

  set comer(value: number) {
    this._comer = value;
  }

  private _dormir: number;

  get dormir(): number {
    return this._dormir;
  }

  set dormir(value: number) {
    this._dormir = value;
  }

  private _interes: number;

  get interes(): number {
    return this._interes;
  }

  set interes(value: number) {
    this._interes = value;
  }

  private _numbereres: number;

  get numbereres(): number {
    return this._numbereres;
  }

  set numbereres(value: number) {
    this._numbereres = value;
  }

  private _es_gratis: number;

  get es_gratis(): number {
    return this._es_gratis;
  }

  set es_gratis(value: number) {
    this._es_gratis = value;
  }

  private _imagenes: string;

  get imagenes(): string {
    return this._imagenes;
  }

  set imagenes(value: string) {
    this._imagenes = value;
  }

  private _rutas: string;

  get rutas(): string {
    return this._rutas;
  }

  set rutas(value: string) {
    this._rutas = value;
  }

  private _lugares: string;

  get lugares(): string {
    return this._lugares;
  }

  set lugares(value: string) {
    this._lugares = value;
  }

  private _calificado: number;

  get calificado(): number {
    return this._calificado;
  }

  set calificado(value: number) {
    this._calificado = value;
  }

  private _write_date: string;

  get write_date(): string {
    return this._write_date;
  }

  set write_date(value: string) {
    this._write_date = value;
  }

  private _url: string;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  private _icon_marker: string;

  get icon_marker(): string {
    return this._icon_marker;
  }

  set icon_marker(value: string) {
    this._icon_marker = value;
  }

  private _images_bo: Array<ImagenesBo>;

  get images_bo(): Array<ImagenesBo> {
    return this._images_bo;
  }

  set images_bo(value: Array<ImagenesBo>) {
    this._images_bo = value;
  }

  public static saveAllJson(newLugares: Array<ILugar>, updateLugares: Array<ILugar>) {
    console.log(newLugares);
    console.log(updateLugares);
    return new Promise((resolve, reject) => {
      const lugaresEntry: LugaresEntry = new LugaresEntry();
      const table_name: string = lugaresEntry.TABLE_NAME;
      var json = {
        "structure": {
          "tables": {
            "lugares": " (" +
            "[" + lugaresEntry.ID + "], " +
            "[" + lugaresEntry.ID_ODOO + "], [" + lugaresEntry.NAME + "]," +
            "[" + lugaresEntry.DESCRIPTION + "], [" + lugaresEntry.SCORE + "]," +
            "[" + lugaresEntry.DIRECCION + "], [" + lugaresEntry.HORARIO + "]," +
            "[" + lugaresEntry.PRECIO + "], [" + lugaresEntry.LATITUD + "]," +
            "[" + lugaresEntry.lONGITUD + "], [" + lugaresEntry.TIPO + "]," +
            "[" + lugaresEntry.COMER + "], [" + lugaresEntry.DORMIR + "]," +
            "[" + lugaresEntry.INTERES + "], [" + lugaresEntry.ES_GRATIS + "]," +
            "[" + lugaresEntry.IMAGENES + "], [" + lugaresEntry.RUTAS_IDS + "]," +
            "[" + lugaresEntry.LUGARES_IDS + "], [" + lugaresEntry.URL + "]," +
            "[" + lugaresEntry.MARKER_ICON + "], [" + lugaresEntry.AUDIO_NAME + "]" +
            ")"
          }
        },
        "data": {
          "inserts": {
            "lugares": newLugares
          }
        }
      };

      AudioguiaSQLiteHelper.sqlitePorter.importJsonToDb(AudioguiaSQLiteHelper.db, json).then(success => {
        console.log("success json Lugares");
        console.log(success);
        resolve(success);
      }).catch((error) => {
        console.log("error json Sectores");
        console.log(error);
        reject(error);
      });

    });
  }

  public get(page: number): Promise<Array<LugaresBo>> {
    const query: string = "SELECT * FROM lugares LIMIT " + APP_CONFIG.LIMIT_SQL + " OFFSET " + APP_CONFIG.LIMIT_SQL * page;
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(query, [])
        .then((data) => {
          console.log('Executed SQL LugaresBo get');
          let array: Array<LugaresBo> = new Array();
          console.log(data.rows);
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i));
              array.push(new LugaresBo(data.rows.item(i)));
            }
          }
          console.log('fin Executed SQL LugaresBo get');
          console.log(array);
          resolve(array);
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error LugaresBo get '});
        });
    });
  }

  public static exist(id: number): Promise<boolean> {
    const query: string = "SELECT id_odoo FROM lugares WHERE id_odoo = ? ";
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(query, [id])
        .then((data) => {
          console.log('Executed SQL LugaresBo exist ' + data.rows.item(0));
          if (data.rows.item(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error LugaresBo exist '});
        });
    });
  }

}
