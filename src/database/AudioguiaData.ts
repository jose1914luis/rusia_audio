import {Injectable} from '@angular/core';


@Injectable()
class LugaresEntry {

  constructor() {
  }

  public TABLE_NAME = "lugares";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public DESCRIPTION: string = "descripcion";
  public SCORE: string = "score";
  public DIRECCION: string = "distancia";
  public HORARIO: string = "duracion";
  public PRECIO: string = "precioentrada";
  public LATITUD: string = "latitud";
  public lONGITUD: string = "longitud";
  public TIPO: string = "tipo";
  public COMER: string = "comer";
  public DORMIR: string = "dormir";
  public INTERES: string = "interes";
  public ES_GRATIS: string = "es_gratis";
  public IMAGENES: string = "imagenes";
  public RUTAS_IDS: string = "rutas";
  public LUGARES_IDS: string = "lugares";
  public AUDIO_NAME: string = "audio_name";
  public AUDIO: string = "audio";
  public CALIFICADO: string = "calificado";
  public WRITE_DATE: string = "write_date";
  public URL: string = "url";
  public MARKER_ICON: string = "icon_marker";

  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " TEXT NULL, " +
    this.NAME + " TEXT NULL, " +
    this.DESCRIPTION + " TEXT NULL, " +
    this.SCORE + " INTEGER DEFAULT 0, " +
    this.DIRECCION + " TEXT NULL, " +
    this.HORARIO + " TEXT NULL, " +
    this.PRECIO + " TEXT NULL, " +
    this.LATITUD + " REAL, " +
    this.lONGITUD + " REAL, " +
    this.TIPO + " TEXT NULL, " +
    this.COMER + " TEXT NULL DEFAULT '0', " +
    this.DORMIR + " TEXT NULL DEFAULT '0', " +
    this.INTERES + " TEXT NULL  DEFAULT '0', " +
    this.ES_GRATIS + " TEXT NULL DEFAULT '0', " +
    this.CALIFICADO + " INTEGER DEFAULT 0, " +
    this.IMAGENES + " TEXT NULL, " +
    this.RUTAS_IDS + " TEXT NULL, " +
    this.AUDIO_NAME + " TEXT NULL, " +
    this.WRITE_DATE + " TEXT NULL, " +
    this.AUDIO + " TEXT NULL, " +
    this.URL + " TEXT NULL, " +
    this.MARKER_ICON + " TEXT NULL, " +
    this.LUGARES_IDS + " TEXT NULL)";

  public DELETE: string =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public INSERT = "INSERT INTO " + this.TABLE_NAME + " (" + this.ID_ODOO + ", " + this.NAME + ", " +
    this.DESCRIPTION + ", " + this.SCORE + ", " + this.DIRECCION + ", " + this.HORARIO + ", " + this.PRECIO + ", " +
    this.LATITUD + ", " + this.lONGITUD + ", " + this.TIPO + ", " + this.COMER + ", " + this.DORMIR + ", " +
    this.INTERES + ", " + this.ES_GRATIS + ", " + this.IMAGENES + ", " + this.RUTAS_IDS + ", " +
    this.AUDIO_NAME + ", " + this.URL + ", " + this.MARKER_ICON + ", " + this.LUGARES_IDS + ") " +
    " VALUES (?, ?, ?, ?, ?," +
    " ? ,?, ?, ?, ?," +
    " ?, ?, ?, ?, ?," +
    " ?, ?, ?, ?, ?) ";

  // public UPDATE = "UPDATE " + this.TABLE_NAME + " SET " + this.IMAGE + "= ? WHERE " + this.ID_ODOO + " = ? ";

  public SELECT_ONE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  public SELECT_ALL = "SELECT * FROM " + this.TABLE_NAME;

  public SELECT_LIMIT = "SELECT * FROM " + this.TABLE_NAME + " ? ORDER BY " + this.NAME + " LIMIT ? OFFSET ? ";

}

@Injectable()
class CitysEntry {
  public TABLE_NAME = "citys";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public IMAGE: string = "image";
  public NAME: string = "name";
  public URL: string = "url";

  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER," +
    this.NAME + " TEXT NULL," +
    this.URL + " TEXT NULL," +
    this.IMAGE + " TEXT NULL)";

  public DELETE: string =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public SELECT_ONE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  public SELECT_ALL = "SELECT * FROM " + this.TABLE_NAME;

}


@Injectable()
class GeneralEntry {
  public TABLE_NAME: string = "general";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public DESCRIPTION: string = "descripcion";
  public IMAGENES: string = "imagenes";
  public APARTADO: string = "apartado";
  public AUDIO_NAME: string = "audio_name";
  public AUDIO: string = "audio";
  public WRITE_DATE: string = "write_date";

  public CREATE =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER, " +
    this.NAME + " TEXT NULL, " +
    this.DESCRIPTION + " TEXT NULL, " +
    this.APARTADO + " TEXT NULL, " +
    this.AUDIO_NAME + " TEXT NULL, " +
    this.AUDIO + " TEXT NULL, " +
    this.WRITE_DATE + " TEXT NULL, " +
    this.IMAGENES + " TEXT NULL)";

  public DELETE =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public SELECT_ONE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? AND " + this.APARTADO + " = ? LIMIT 1 ";

  public SELECT_ALL = "SELECT * FROM " + this.TABLE_NAME;

  public INSERT = "INSERT INTO " + this.TABLE_NAME + " (" + this.ID_ODOO + ", " + this.NAME + "," + this.DESCRIPTION + ", " + this.APARTADO + "," + this.IMAGENES + ") VALUES (?, ?, ?, ?, ?)";

}


@Injectable()
class FavoritosEntry {
  public TABLE_NAME: string = "favoritos";
  public ID: string = "id";
  public FK: string = "fk";
  public NAME: string = "name";
  public SECCION: string = "seccion";
  public IMAGENES: string = "imagenes";
  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME +
    " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.FK + " INTEGER, " +
    this.SECCION + " TEXT NULL, " +
    this.IMAGENES + " TEXT NULL, " +
    this.NAME + " TEXT NULL" +
    ")";

  public DELETE: string = "DROP TABLE IF EXISTS " + this.TABLE_NAME;
};


@Injectable()
class RutasEntry {
  public TABLE_NAME: string = "rutas";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public AUDIO: string = "audio";
  public DESCRIPTION: string = "descripcion";
  public SCORE: string = "score";
  public DISTANCIA: string = "distancia";
  public DURACION: string = "duracion";
  public RUTA: string = "ruta";
  public ES_GRATIS: string = "es_gratis";
  public IMAGENES: string = "imagenes";
  public RUTAS_IDS: string = "rutas_ids";
  public LUGARES_IDS: string = "lugares_ids";
  public AUDIO_NAME: string = "audio_name";
  public CALIFICADO: string = "calificado";
  public WRITE_DATE: string = "write_date";

  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " TEXT, " +
    this.NAME + " TEXT NULL, " +
    this.DESCRIPTION + " TEXT NULL, " +
    this.SCORE + " INTEGER DEFAULT 0, " +
    this.DISTANCIA + " TEXT NULL, " +
    this.DURACION + " TEXT NULL, " +
    this.RUTA + " TEXT NULL, " +
    this.ES_GRATIS + " INTEGER DEFAULT 0, " +
    this.CALIFICADO + " INTEGER DEFAULT 0, " +
    this.IMAGENES + " TEXT NULL, " +
    this.RUTAS_IDS + " TEXT NULL, " +
    this.AUDIO_NAME + " TEXT NULL, " +
    this.AUDIO + " TEXT NULL, " +
    this.WRITE_DATE + " TEXT NULL, " +
    this.LUGARES_IDS + " TEXT NULL)";

  public DELETE: string =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public SELECT_ONE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  public SELECT_ALL = "SELECT * FROM " + this.TABLE_NAME;

}


@Injectable()
class EstacionesEntry {
  public TABLE_NAME: string = "estaciones";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public DESCRIPTION: string = "descripcion";
  public IMAGENES: string = "imagenes";
  public SCORE: string = "score";
  public ES_GRATIS: string = "es_gratis";
  public PRECIO: string = "precio";
  public AUDIO_NAME: string = "audio_name";
  public CALIFICADO: string = "calificado";
  public WRITE_DATE: string = "write_date";
  public AUDIO: string = "audio";


  public CREATE =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER, " +
    this.NAME + " TEXT NULL, " +
    this.DESCRIPTION + " TEXT NULL, " +
    this.ES_GRATIS + " INTEGER DEFAULT 0, " +
    this.CALIFICADO + " INTEGER DEFAULT 0, " +
    this.SCORE + " TEXT NULL, " +
    this.PRECIO + " TEXT NULL, " +
    this.AUDIO_NAME + " TEXT NULL, " +
    this.AUDIO + " TEXT NULL, " +
    this.WRITE_DATE + " TEXT NULL, " +
    this.IMAGENES + " TEXT NULL)";

  public DELETE =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public SELECT_ONE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  public SELECT_ALL = "SELECT * FROM " + this.TABLE_NAME;

}

@Injectable()
class LogEnty {
  public TABLE_NAME = "logs";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public ID_MODIFY: string = "id_modify";
  public ACTION: string = "action";

  public CREATE =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER," +
    this.NAME + " TEXT NULL," +
    this.ACTION + " TEXT NULL, " +
    this.ID_MODIFY + " INTEGER)";

  public DELETE =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;
}

@Injectable()
class ImagenesEntry {
  public TABLE_NAME = "imagenes";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public IMAGE: string = "image";

  public CREATE =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER," +
    this.IMAGE + " TEXT NULL)";

  public DELETE =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;

  public INSERT = "INSERT INTO " + this.TABLE_NAME + " (" + this.ID_ODOO + ", " + this.IMAGE + ") VALUES ( ?, ? )";

  public UPDATE = "UPDATE " + this.TABLE_NAME + " SET " + this.IMAGE + "= ? WHERE " + this.ID_ODOO + " = ? ";

  public EXIST = "SELECT * FROM  " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  public EXIST_IMG = "SELECT * FROM  " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? AND ( " + this.IMAGE + " IS NULL OR " + this.IMAGE + " = '' ) LIMIT 1 ";

  public SELECT_ONE = "SELECT * FROM  " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";

  // public SELECT_IMAGE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? LIMIT 1 ";
  public SELECT_IMAGE = "SELECT * FROM " + this.TABLE_NAME + " WHERE " + this.ID_ODOO + " = ? AND " + this.IMAGE + " IS NOT NULL LIMIT 1 ";

}

@Injectable()
class TipoEntry {
  public TABLE_NAME = "tipo";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public IMAGE: string = "image";

  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER," +
    this.IMAGE + " TEXT NULL)";

  public DELETE: string =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;
}


@Injectable()
class LogFileEnty {
  public TABLE_NAME = "logs_file";

  public ID: string = "id";
  public ID_ODOO: string = "id_odoo";
  public NAME: string = "name";
  public ID_MODIFY: string = "id_modify";
  public ACTION: string = "action";

  public CREATE: string =
    "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + " (" +
    this.ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
    this.ID_ODOO + " INTEGER," +
    this.NAME + " TEXT NULL," +
    this.ACTION + " TEXT NULL, " +
    this.ID_MODIFY + " INTEGER)";

  public DELETE: string =
    "DROP TABLE IF EXISTS " + this.TABLE_NAME;
}


export {
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
}
