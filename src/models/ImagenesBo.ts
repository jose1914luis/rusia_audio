import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";

export class ImagenesBo {
  private _id: number;
  private _image: string;
  private _helper: AudioguiaSQLiteHelper;


  constructor(obj = null) {
    if (!obj) {
      return;
    }

    this._id = obj.id;
    this._image = obj.image;
    this._helper = obj.helper;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get helper(): AudioguiaSQLiteHelper {
    return this._helper;
  }

  set helper(value: AudioguiaSQLiteHelper) {
    this._helper = value;
  }

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

  public static Boolean exist(number id, SQLiteDatabase db){
      string query = "select id_odoo from imagenes where id_odoo = " + id;
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
      values.put(AudioguiaData.ImagenesEntry.ID_ODOO, this.id);
      values.put(AudioguiaData.ImagenesEntry.IMAGE, this.image);
      long result = 0;
      if(exist(this.id, db))
          result = db.update(AudioguiaData.ImagenesEntry.TABLE_NAME, values, "id_odoo = " + this.id, null);
      else
          result = db.insert(AudioguiaData.ImagenesEntry.TABLE_NAME, null,values);
      db.close();
      return result;
  }

  public static long insert(SQLiteDatabase db, number id){
      ContentValues values = new ContentValues();
      values.put(AudioguiaData.ImagenesEntry.ID_ODOO, id);
      long result = 0;
      if(!exist(id, db))
          result = db.insert(AudioguiaData.ImagenesEntry.TABLE_NAME, null,values);
      //db.close();
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
