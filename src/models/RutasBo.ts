import {IRuta} from "../interface/IRuta";
import {RutasEntry} from "../database/AudioguiaData";
import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {APP_CONFIG} from "../../constants";
import {ImagenesBo} from "./ImagenesBo";

export class RutasBo {
  private _id: number;
  private _id_odoo: number;
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
  private _images_bo: Array<ImagenesBo>;

  constructor(obj = null) {
    if (!obj) {
      return;
    }

    this._id = obj.id;
    this._id_odoo = obj.id_odoo;
    this._name = obj.name;
    this._audio_name = obj.audio_name;
    this._descripcion = obj.descripcion;
    this._score = obj.score;
    this._distancia = obj.distancia;
    this._duracion = obj.duracion;
    this._ruta = obj.ruta;
    this._es_gratis = obj.es_gratis;
    this._precio = obj.precio;
    this._calificado = obj.calificado;
    this._write_date = obj.write_date;
    this._imagenes = obj.imagenes;
    this._rutas = obj.rutas;
    this._lugares = obj.lugares;
    this._images_bo = obj.images_bo || new Array();
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }


  get id_odoo(): number {
    return this._id_odoo;
  }

  set id_odoo(value: number) {
    this._id_odoo = value;
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

  get images_bo(): Array<ImagenesBo> {
    return this._images_bo;
  }

  set images_bo(value: Array<ImagenesBo>) {
    this._images_bo = value;
  }

  public static saveAllJson(newData: Array<IRuta>, updateData: Array<IRuta>) {
    console.log(newData);
    console.log(updateData);
    return new Promise((resolve, reject) => {
      const rutasEntry: RutasEntry = new RutasEntry();
      var json = {
        "structure": {
          "tables": {
            "rutas": " (" +
            "[" + rutasEntry.ID + "], " +
            "[" + rutasEntry.ID_ODOO + "], [" + rutasEntry.NAME + "]," +
            "[" + rutasEntry.DESCRIPTION + "], [" + rutasEntry.SCORE + "]," +
            "[" + rutasEntry.DURACION + "], [" + rutasEntry.RUTA + "]," +
            "[" + rutasEntry.ES_GRATIS + "], [" + rutasEntry.IMAGENES + "]," +
            "[" + rutasEntry.RUTAS_IDS + "], [" + rutasEntry.LUGARES_IDS + "]," +
            "[" + rutasEntry.DISTANCIA + "] " +
            ")"
          }
        },
        "data": {
          "inserts": {
            "rutas": newData
          }
        }
      };

      AudioguiaSQLiteHelper.sqlitePorter.importJsonToDb(AudioguiaSQLiteHelper.db, json).then(success => {
        console.log("success json RutasBo " + success);
        console.log(success);
        resolve(success);
      }).catch((error) => {
        console.log("error json RutasBo");
        console.log(error);
        reject(error);
      });
    });
  }

  public get(page: number): Promise<Array<RutasBo>> {
    return new Promise((resolve, reject) => {

      const rutasEntry: RutasEntry = new RutasEntry();
      // const query = "SELECT * FROM " + rutasEntry.TABLE_NAME + " ORDER BY " + rutasEntry.NAME + " LIMIT ? OFFSET ? ";
      const query = "SELECT * FROM " + rutasEntry.TABLE_NAME + " ORDER BY " + rutasEntry.NAME;
      //AudioguiaSQLiteHelper.db.executeSql(query, [APP_CONFIG.LIMIT_SQL, ( APP_CONFIG.LIMIT_SQL * page)])
      AudioguiaSQLiteHelper.db.executeSql(query, [])
        .then((data) => {
          console.log('Executed SQL RutasBo get');
          let array: Array<RutasBo> = new Array();
          console.log(data.rows);
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i));
              array.push(new RutasBo(data.rows.item(i)));
            }
          }
          console.log('fin Executed SQL RutasBo get');
          console.log(array);
          resolve(array.slice(( APP_CONFIG.LIMIT_SQL * page) - APP_CONFIG.LIMIT_SQL, ( APP_CONFIG.LIMIT_SQL * page)));
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error RutasBo get '});
        });
    });
  }

  public static exist(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new RutasEntry().SELECT_ONE, [id])
        .then((data) => {
          console.log('Executed SQL RutasBo exist ' + data.rows.item(0));
          if (data.rows.item(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error RutasBo exist '});
        });
    });
  }
}
