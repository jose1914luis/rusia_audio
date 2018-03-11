import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {ImagenesEntry} from "../database/AudioguiaData";

export class ImagenesBo {
  private _id: number;
  private _id_odoo: number;
  private _image: string;


  constructor(obj = null) {
    if (!obj) {
      return;
    }

    this._id = obj.id;
    this._image = obj.image;
    this._id_odoo = obj.id_odoo;
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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  insert(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new ImagenesEntry().INSERT, [id])
        .then((data) => {
          console.log('Executed SQL ImagenesBo insert');
          console.log(data);
          resolve(true);
        })
        .catch(ex => {
          debugger;
          console.log(ex);
          reject({status: 500, message: ex || 'Error ImagenesBo insert'});
        });
    });
  }

  update(obj: ImagenesBo): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new ImagenesEntry().UPDATE, [obj.image, obj.id_odoo])
        .then((data) => {
          console.log('Executed SQL ImagenesBo update');
          console.log(data);
          resolve(true)
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error ImagenesBo update'});
        });
    });
  }

  exist(id_odoo: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new ImagenesEntry().EXIST, [id_odoo])
        .then((data) => {
          console.log('Executed SQL ImagenesBo exist');
          console.log(data);
          if (data.rows.item(0))
            resolve(true);
          else
            resolve(false);
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error ImagenesBo exist'});
        });
    });
  }


  getImageById(id_odoo: string): Promise<ImagenesBo> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new ImagenesEntry().SELECT_IMAGE, [id_odoo])
        .then((data) => {
          console.log('Executed SQL ImagenesBo getImageById');
          console.log(data);
          if (data.rows.item(0)) {
            resolve(new ImagenesBo(data.rows.item(0)));
          }
          else
            reject({status: 500, message: 'ImagenesBo getImageById ' + id_odoo + ' No found.'});
        })
        .catch(ex => {
          console.log(ex);
          reject({status: 500, message: ex || 'Error ImagenesBo getImageById'});
        });
    });
  }


  /*  public long save(){
      ContentValues values = new ContentValues();
      SQLiteDatabase db = helper.getWritableDatabase();
      values.put(AudioguiaData.ImagenesEntry.ID_ODOO, this.id);
      values.put(AudioguiaData.ImagenesEntry.IMAGE, this.image);
      long result = 0;
      if(exist(this.id, db))
        result = db.update(AudioguiaData.ImagenesEntry.TABLE_NAME, values, "id_odoo = " + this.id, null);
      else
        result = db.insert(AudioguiaData.ImagenesEntry.TABLE_NAME, null,values);
      db.close();
      return result;
    }*/

  /*
  public static number lastId(SQLiteDatabase db){
      string query = "select id_odoo from imagenes order by id_odoo desc limit 1";
      Cursor c = db.rawQuery(query, null);
      number result = 0;
      if(c.moveToFirst())
          result = c.getnumber(c.getColumnIndex(AudioguiaData.ImagenesEntry.ID_ODOO));
      c.close();
      return result;
  }






  public static Stack<ImagenesBo> all(SQLiteDatabase db){
      Stack<ImagenesBo> items = new Stack<>();
      string query = "select id_odoo from imagenes where image is null";
      Cursor c = db.rawQuery(query, null);
      while(c.moveToNext()){
          ImagenesBo item = new ImagenesBo();
          item.setId(c.getnumber(c.getColumnIndex(AudioguiaData.ImagenesEntry.ID_ODOO)));
          items.push(item);
      }
      c.close();
      return items;
  }
  */
}
