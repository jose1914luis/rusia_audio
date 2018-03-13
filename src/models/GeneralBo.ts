import {IGeneral} from "../interface/IGeneral";
import {GeneralEntry} from "../database/AudioguiaData";
import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {APP_CONFIG} from "../../constants";
import {ImagenesBo} from "./ImagenesBo";

export class GeneralBo {

  private _id: number;
  private _id_odoo: number;
  private _name: string;
  private _descripcion: string;
  private _imagenes: string;
  private _images_bo: Array<ImagenesBo>;
  private _score: number;
  private _apartado: string;
  private _es_gratis: number;
  private _audio_name: string;
  private _calificado: number;
  private _audio: string;
  private _write_date: string;

  constructor(obj = null) {
    if (!obj) {
      return;
    }

    this._id = obj.id;
    this._id_odoo = obj.id_odoo;
    this._name = obj.name;
    this._descripcion = obj.descripcion;
    this._imagenes = obj.imagenes;
    this._images_bo = new Array();
    this._score = obj.score;
    this._apartado = obj.apartado;
    this._es_gratis = obj.es_gratis;
    this._audio_name = obj.audio_name;
    this._calificado = obj.calificado;
    this._audio = obj.audio;
    this._write_date = obj.write_date;
  }

  get id_odoo(): number {
    return this._id_odoo;
  }

  set id_odoo(value: number) {
    this._id_odoo = value;
  }

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

  get images_bo(): Array<ImagenesBo> {
    return this._images_bo;
  }

  set images_bo(value: Array<ImagenesBo>) {
    this._images_bo = value;
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

  public static saveAllJson(newData: Array<IGeneral>, updateData: Array<IGeneral>) {
    console.log(newData);
    console.log(updateData);
    return new Promise((resolve, reject) => {
      const generalEntry: GeneralEntry = new GeneralEntry();
      var json = {
        "structure": {
          "tables": {
            "general": " (" +
            "[" + generalEntry.ID + "], " +
            "[" + generalEntry.ID_ODOO + "], [" + generalEntry.NAME + "]," +
            "[" + generalEntry.DESCRIPTION + "], [" + generalEntry.IMAGENES + "]," +
            "[" + generalEntry.APARTADO + "]" +
            ")"
          }
        },
        "data": {
          "inserts": {
            "general": newData
          }
        }
      };

      AudioguiaSQLiteHelper.sqlitePorter.importJsonToDb(AudioguiaSQLiteHelper.db, json).then(success => {
        console.log("success json GeneralBo");
        console.log(success);
        resolve(success);
      }).catch((error) => {
        console.log("error json GeneralBo");
        console.log(error);
        reject(error);
      });
    });
  }

  public get(page: number, aparto: string = ""): Promise<Array<GeneralBo>> {
    return new Promise((resolve, reject) => {
      const generalEntry: GeneralEntry = new GeneralEntry();
      const query = "SELECT * FROM " + generalEntry.TABLE_NAME + " WHERE " + generalEntry.APARTADO + " = ? ORDER BY " + generalEntry.NAME + " LIMIT ? OFFSET ? ";
      AudioguiaSQLiteHelper.db.executeSql(query, [aparto, APP_CONFIG.LIMIT_SQL, ( APP_CONFIG.LIMIT_SQL * page)])
        .then((data) => {
          console.log('Executed SQL GeneralBo get');
          let array: Array<GeneralBo> = new Array();
          console.log(data.rows);
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i));
              array.push(new GeneralBo(data.rows.item(i)));
            }
          }
          console.log('fin Executed SQL GeneralBo get');
          console.log(array);
          resolve(array);
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error GeneralBo get '});
        });
    });
  }

  public static exist(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new GeneralEntry().SELECT_ONE, [id])
        .then((data) => {
          console.log('Executed SQL GeneralBo exist ' + data.rows.item(0));
          if (data.rows.item(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error GeneralBo exist '});
        });
    });
  }
}
