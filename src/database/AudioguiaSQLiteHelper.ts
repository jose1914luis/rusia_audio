import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {
  FavoritosEntry,
  CitysEntry,
  EstacionesEntry,
  GeneralEntry,
  ImagenesEntry,
  LogEnty,
  LogFileEnty,
  LugaresEntry,
  RutasEntry,
  TipoEntry
} from "./AudioguiaData";
import {APP_CONFIG} from "../../constants";

@Injectable()
export class AudioguiaSQLiteHelper {

  public static isOpen: boolean = false;
  public storage: SQLite;
  public static sqlitePorter: SQLitePorter = null;
  public static db: SQLiteObject = null;
  public static options = {name: APP_CONFIG.SQLITE_DB || 'AudioGuiaRusia01.db', location: 'default'};

  public constructor(public sqlite: SQLite,
                     public favoritosEntry: FavoritosEntry,
                     public citysEntry: CitysEntry,
                     public estacionesEntry: EstacionesEntry,
                     public generalEntry: GeneralEntry,
                     public imagenesEntry: ImagenesEntry,
                     public logEnty: LogEnty,
                     public logFileEnty: LogFileEnty,
                     public lugaresEntry: LugaresEntry,
                     public rutasEntry: RutasEntry,
                     public tipoEntry: TipoEntry,
                     public sqlitePorter: SQLitePorter) {

    AudioguiaSQLiteHelper.sqlitePorter = sqlitePorter;

  }

  initDb() {
    this.sqlite.create(AudioguiaSQLiteHelper.options).then((db: SQLiteObject) => {

      if (AudioguiaSQLiteHelper.isOpen == false) {
        AudioguiaSQLiteHelper.db = db;
        console.log('Create DataBase');
        db.executeSql(this.favoritosEntry.CREATE, {}).then(() => console.log('Executed SQL FavoritosEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.rutasEntry.CREATE, {}).then(() => console.log('Executed SQL RutasEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.lugaresEntry.CREATE, {}).then(() => console.log('Executed SQL LugaresEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.generalEntry.CREATE, {}).then(() => console.log('Executed SQL GeneralEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.estacionesEntry.CREATE, {}).then(() => console.log('Executed SQL EstacionesEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.logEnty.CREATE, {}).then(() => console.log('Executed SQL LogEnty CREATE')).catch(e => console.log(e));
        db.executeSql(this.imagenesEntry.CREATE, {}).then(() => console.log('Executed SQL ImagenesEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.tipoEntry.CREATE, {}).then(() => console.log('Executed SQL TipoEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.citysEntry.CREATE, {}).then(() => console.log('Executed SQL CitysEntry CREATE')).catch(e => console.log(e));
        db.executeSql(this.logFileEnty.CREATE, {}).then(() => console.log('Executed SQL LogFileEnty CREATE')).catch(e => console.log(e));
        AudioguiaSQLiteHelper.isOpen = true;
      }
    })
      .catch(e => {
        console.log('Create DataBase ERROR');
        console.log(e);
      });
  }
}
