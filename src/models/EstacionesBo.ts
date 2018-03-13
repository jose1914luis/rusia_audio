import {APP_CONFIG} from "../../constants";
import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {EstacionesEntry} from "../database/AudioguiaData";
import {IEstacion} from "../interface/IEstacion";

export class EstacionesBo {

  private _id: number;
  private _id_odoo: number;
  private _name: string;
  private _audio_name: string;
  private _descripcion: string;
  private _score: number;
  private _es_gratis: number;
  private _imagenes: string;
  private _calificado: number;
  private _write_date: string;
  private _precio: number;


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
    this._es_gratis = obj.es_gratis;
    this._imagenes = obj.imagenes;
    this._calificado = obj.calificado;
    this._write_date = obj.write_date;
    this._precio = obj.precio;
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

  get es_gratis(): number {
    return this._es_gratis;
  }

  set es_gratis(value: number) {
    this._es_gratis = value;
  }

  get imagenes(): string {
    return this._imagenes;
  }

  set imagenes(value: string) {
    this._imagenes = value;
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

  get precio(): number {
    return this._precio;
  }

  set precio(value: number) {
    this._precio = value;
  }

  public static saveAllJson(newData: Array<IEstacion>, updateData: Array<IEstacion>) {
    console.log(newData);
    console.log(updateData);
    return new Promise((resolve, reject) => {
      const estacionesEntry: EstacionesEntry = new EstacionesEntry();
      var json = {
        "structure": {
          "tables": {
            "estaciones": " (" +
            "[" + estacionesEntry.ID + "], " +
            "[" + estacionesEntry.ID_ODOO + "], [" + estacionesEntry.NAME + "]," +
            "[" + estacionesEntry.DESCRIPTION + "], [" + estacionesEntry.IMAGENES + "]," +
            "[" + estacionesEntry.SCORE + "], [" + estacionesEntry.PRECIO + "]," +
            "[" + estacionesEntry.ES_GRATIS + "] " +
            ")"
          }
        },
        "data": {
          "inserts": {
            "estaciones": newData
          }
        }
      };

      AudioguiaSQLiteHelper.sqlitePorter.importJsonToDb(AudioguiaSQLiteHelper.db, json).then(success => {
        console.log("success json Lugares");
        console.log(success);
        resolve(success);
      }).catch((error) => {
        console.log("error json Lugares");
        console.log(error);
        reject(error);
      });
    });
  }

  public get(page: number, where: string = ""): Promise<Array<EstacionesBo>> {
    return new Promise((resolve, reject) => {

      const estacionesEntry: EstacionesEntry = new EstacionesEntry();
      const query = "SELECT * FROM " + estacionesEntry.TABLE_NAME + " " + where + " ORDER BY " + estacionesEntry.NAME + " LIMIT ? OFFSET ? ";
      AudioguiaSQLiteHelper.db.executeSql(query, [APP_CONFIG.LIMIT_SQL, ( APP_CONFIG.LIMIT_SQL * page)])
        .then((data) => {
          console.log('Executed SQL EstacionesBo get');
          let array: Array<EstacionesBo> = new Array();
          console.log(data.rows);
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i));
              array.push(new EstacionesBo(data.rows.item(i)));
            }
          }
          console.log('fin Executed SQL EstacionesBo get');
          console.log(array);
          resolve(array);
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error EstacionesBo get '});
        });
    });
  }

  public static exist(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new EstacionesEntry().SELECT_ONE, [id])
        .then((data) => {
          console.log('Executed SQL EstacionesBo exist ' + data.rows.item(0));
          if (data.rows.item(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error EstacionesBo exist '});
        });
    });
  }
}
