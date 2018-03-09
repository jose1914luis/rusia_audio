import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";

export class TipoBo {
  private _id: number;
  private _image: string;
  private static _audioguiaSQLiteHelper: AudioguiaSQLiteHelper;

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

  static get audioguiaSQLiteHelper(): AudioguiaSQLiteHelper {
    return this._audioguiaSQLiteHelper;
  }

  static set audioguiaSQLiteHelper(value: AudioguiaSQLiteHelper) {
    this._audioguiaSQLiteHelper = value;
  }

  /*
    public static TipoBo find(int id, SQLiteDatabase db){
        String query = "SELECT * FROM tipo WHERE id_odoo = " + id;
        Cursor c = db.rawQuery(query, null);
        TipoBo item = null;
        if(c.moveToFirst()){
            item = new TipoBo();
            item.setId(c.getInt(c.getColumnIndex(AudioguiaData.TipoEntry.ID_ODOO)));
            item.setImage(c.getString(c.getColumnIndex(AudioguiaData.TipoEntry.IMAGE)));
        }
        c.close();
        return item;
    }

    public static void delete(int id, SQLiteDatabase db){
        db.rawQuery("DELETE FROM " + AudioguiaData.TipoEntry.TABLE_NAME + " WHERE id_odoo="+id, null);
    }

    public long save(){
        SQLiteDatabase db = audioguiaSQLiteHelper.getWritableDatabase();
        ContentValues  values = new ContentValues();
        values.put(AudioguiaData.TipoEntry.ID_ODOO, this.id);
        values.put(AudioguiaData.TipoEntry.IMAGE, this.image);
        long result = db.insert(AudioguiaData.TipoEntry.TABLE_NAME, null, values);
        db.close();
        return result;
    }

    public int update(){
        SQLiteDatabase db = audioguiaSQLiteHelper.getWritableDatabase();
        ContentValues  values = new ContentValues();
        values.put(AudioguiaData.TipoEntry.ID_ODOO, this.id);
        values.put(AudioguiaData.TipoEntry.IMAGE, this.image);
        int result = db.update(AudioguiaData.TipoEntry.TABLE_NAME, values, " id_odoo = " + this.id, null);
        db.close();
        return result;
    }
    */
}
