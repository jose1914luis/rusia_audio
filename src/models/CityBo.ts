import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";

export class CityBo {
  private _id: number;
  private _name: string;
  private _image: string;
  private _playStore: string = "";
  private _helper: AudioguiaSQLiteHelper;


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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get playStore(): string {
    return this._playStore;
  }

  set playStore(value: string) {
    this._playStore = value;
  }

  get helper(): AudioguiaSQLiteHelper {
    return this._helper;
  }

  set helper(value: AudioguiaSQLiteHelper) {
    this._helper = value;
  }

  /*
  public CityBo() {
  }

  public CityBo(helper: AudioguiaSQLiteHelper) {
    this.helper = helper;
  }*/

  /*
  public static CityBo find(number id, SQLiteDatabase db){
      string query = "select * from citys where id_odoo = " + id;
      Cursor c = db.rawQuery(query, null);
      CityBo item = null;
      if(c.moveToFirst()){
          item = new CityBo();
          item.setId(c.getInt(c.getColumnIndex(AudioguiaData.CitysEntry.ID_ODOO)));
          item.setName(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.NAME)));
          item.setImage(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.IMAGE)));
          item.setPlayStore(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.PLAY_STORE)));
      }
      c.close();
      return item;
  }

  public static List<CityBo> all(SQLiteDatabase db){
      string query = "select * from citys";
      Cursor c = db.rawQuery(query, null);
      List<CityBo> items = new ArrayList<>();
      while (c.moveToNext()){
          CityBo item = new CityBo();
          item.setId(c.getInt(c.getColumnIndex(AudioguiaData.CitysEntry.ID_ODOO)));
          item.setName(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.NAME)));
          item.setImage(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.IMAGE)));
          item.setPlayStore(c.getString(c.getColumnIndex(AudioguiaData.CitysEntry.PLAY_STORE)));
          items.add(item);
      }
      c.close();
      return items;
  }

  public long save(){
      SQLiteDatabase db = helper.getWritableDatabase();
      ContentValues values = new ContentValues();
      values.put(AudioguiaData.CitysEntry.ID_ODOO, this.Id);
      values.put(AudioguiaData.CitysEntry.NAME, this.Name);
      values.put(AudioguiaData.CitysEntry.IMAGE, this.Image);
      values.put(AudioguiaData.CitysEntry.PLAY_STORE, this.PlayStore);
      long result = 0;
      if(find(this.Id, db) == null)
          result = db.insert(AudioguiaData.CitysEntry.TABLE_NAME, null, values);
      else
          result = db.update(AudioguiaData.CitysEntry.TABLE_NAME, values, "id_odoo = " + this.Id, null);
      db.close();
      return result;
  }
  */
}
