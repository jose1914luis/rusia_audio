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

  exist(id_odoo: string): Promise<ImagenesBo> {
    return new Promise((resolve, reject) => {
      AudioguiaSQLiteHelper.db.executeSql(new ImagenesEntry().EXIST, [id_odoo])
        .then((data) => {
          console.log('Executed SQL ImagenesBo exist');
          console.log(data);
          if (data.rows.item(0))
            resolve(new ImagenesBo(data.rows.item(0)));
          else
            resolve(new ImagenesBo());
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

}
