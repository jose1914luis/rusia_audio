import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";

export class LogFile {
  private _id: number;
  private _id_modify: number;
  private _action: string;
  private _model: string;
  private _helper: AudioguiaSQLiteHelper;

  constructor(obj = null) {
    if (!obj) {
      return;
    }

    this._helper = obj.helper;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get id_modify(): number {
    return this._id_modify;
  }

  set id_modify(value: number) {
    this._id_modify = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }

  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  get helper(): AudioguiaSQLiteHelper {
    return this._helper;
  }

  set helper(value: AudioguiaSQLiteHelper) {
    this._helper = value;
  }

  /*
  public static number lastId(SQLiteDatabase db){
      string query = "select id_odoo from logs_file order by id_odoo desc limit 1";
      Cursor c = db.rawQuery(query, null);
      number result = 0;
      if(c.moveToFirst())
          result = c.getnumber(c.getColumnIndex(AudioguiaData.LogFileEnty.ID_ODOO));
      c.close();
      return result;
  }

  public static Boolean exist(number id, SQLiteDatabase db){
      string query = "select id_odoo from logs_file where id_odoo = " + id;
      Cursor c = db.rawQuery(query, null);
      boolean result = false;
      if(c.moveToFirst())
          result = true;
      c.close();
      return result;
  }

  public long save(){
      ContentValues values = new ContentValues();
      SQLiteDatabase db = helper.getWritableDatabase();
      values.put(AudioguiaData.LogFileEnty.ID_ODOO, this.id);
      values.put(AudioguiaData.LogFileEnty.ACTION, this.action);
      values.put(AudioguiaData.LogFileEnty.ID_MODIFY, this.id_modify);
      values.put(AudioguiaData.LogFileEnty.NAME, this.model);
      long result = db.insert(AudioguiaData.LogFileEnty.TABLE_NAME, null,values);
      db.close();
      return result;
  }
  */

}
