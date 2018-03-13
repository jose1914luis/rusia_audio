import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {CitysEntry} from "../database/AudioguiaData";
import {ICity} from "../interface/ICity";
import {APP_CONFIG} from "../../constants";

export class CityBo {

  private _id: number;
  private _id_odoo: number;
  private _name: string;
  private _image: string;
  private _url: string;

  constructor(obj = null) {
    if (!obj) {
      return;
    }
    this._id = obj.id;
    this._id_odoo = obj.id_odoo;
    this._name = obj.name;
    this._image = obj.image;
    this._url = obj.url;
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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  public static saveAllJson(newData: Array<ICity>, updateData: Array<ICity>) {
    console.log(newData);
    console.log(updateData);
    return new Promise((resolve, reject) => {
      const cityEntry: CitysEntry = new CitysEntry();
      var json = {
        "structure": {
          "tables": {
            "citys": " (" +
            "[" + cityEntry.ID + "], " +
            "[" + cityEntry.ID_ODOO + "], [" + cityEntry.NAME + "]," +
            "[" + cityEntry.URL + "], [" + cityEntry.IMAGE + "]" +
            ")"
          }
        },
        "data": {
          "inserts": {
            "citys": newData
          }
        }
      };

      AudioguiaSQLiteHelper.sqlitePorter.importJsonToDb(AudioguiaSQLiteHelper.db, json).then(success => {
        console.log("success json CityBo");
        console.log(success);
        resolve(success);
      }).catch((error) => {
        console.log("error json CityBo");
        console.log(error);
        reject(error);
      });
    });
  }

  public get(page: number): Promise<Array<CityBo>> {
    return new Promise((resolve, reject) => {

      const cityEntry: CitysEntry = new CitysEntry();
      const query = "SELECT * FROM " + cityEntry.TABLE_NAME; //+ " ORDER BY " + cityEntry.NAME + " LIMIT ? OFFSET ? ";
      //[APP_CONFIG.LIMIT_SQL, ( APP_CONFIG.LIMIT_SQL * page)]
      AudioguiaSQLiteHelper.db.executeSql(query, [])
        .then((data) => {
          console.log('Executed SQL CityBo get');
          let array: Array<CityBo> = new Array();
          console.log(data.rows);
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i));
              array.push(new CityBo(data.rows.item(i)));
            }
          }
          console.log('fin Executed SQL CityBo get');
          console.log(array);
          resolve(array);
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error CityBo get '});
        });
    });
  }

  public static exist(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new CitysEntry().SELECT_ONE, [id])
        .then((data) => {
          console.log('Executed SQL CityBo exist ' + data.rows.item(0));
          if (data.rows.item(0)) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error CityBo exist '});
        });
    });
  }

}
