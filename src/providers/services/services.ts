import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../../constants";
import {DomSanitizer} from '@angular/platform-browser';
import {UtilTool} from "../util";
import {LugaresEntry} from "../../database/AudioguiaData";
import {ILugar} from "../../interface/ILugar";
import {LugaresBo} from "../../models/LugaresBo";
import {ImagenesBo} from "../../models/ImagenesBo";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";

declare var OdooApi: any;

@Injectable()
export class Services {

  odoo: any;

  constructor(public domSanitizer: DomSanitizer,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public lugaresEntry: LugaresEntry,
              public util: UtilTool) {

    this.audioguiaSQLiteHelper.initDb();
    this.odoo = new OdooApi(APP_CONFIG.SERVER_URL, APP_CONFIG.DATABASE_NAME);

  }


  login() {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      this.odoo.login(APP_CONFIG.EMAIL, APP_CONFIG.PASS_EMAIL).then((uid) => {
        resolve(uid);
      }).catch(ex => {
          reject({status: 500, message: ex || 'Error consultando lugares '});
        }
      );
    });
  }

  getLugares() {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["name", "descripcion", "score", "direccion", "horario", "precio_entrada", "latitud", "longitud", "tipo", "comer", "dormir", "interes", "es_gratis", "imagenes", "rutas_ids", "lugares_ids", "audio_name", "url"];
      const defaultQuery = [['city_id', '=', APP_CONFIG.CITY_ID]];
      self.odoo.search_read('audioguia.lugares', defaultQuery, fields).then(async value => {
        console.log(value);

        let array: Array<ILugar> = new Array();

        for (var data of value) {
          let item: LugaresBo = new LugaresBo(data);
          let lugarImgs: Array<ImagenesBo> = new Array();
          item.imagenes = this.util.getListIds(data.imagenes);
          const lugar: ILugar = {
            id: 0,
            id_odoo: item.id,
            name: item.name,
            descripcion: item.descripcion,
            score: item.score,
            direccion: item.direccion,
            horario: item.horario,
            precio_entrada: item.precio_entrada,
            latitud: item.latitud,
            longitud: item.longitud,
            tipo: item.tipo,
            comer: item.comer,
            dormir: item.dormir,
            interes: item.interes,
            es_gratis: item.es_gratis,
            imagenes: item.imagenes,
            rutas: item.rutas,
            lugares: item.lugares,
            url: item.url,
            icon_marker: item.icon_marker
          };

          array.push(lugar);
          //GUARDAR ID EN TABLA IMAGENES

          /*
                    if(action.equals("update"))
                      db.update(TABLE_NAME:values, ID_ODOO+"="+item.getId(), null);
                    else {
                      db.insert(TABLE_NAME, null, values);
                    }
                    */


          /*
          for (var img of data.imagenes) {
            await self.getImage(img).then(image => {
              lugarImgs.push(new ImagenesBo(image));
            }).catch(error => {
            });
          }
          lugar.imagenes = lugarImgs;
          UtilTool.lugares.push(lugar);
          */

        }

        /*
        UtilTool.lugares = new Array();
        for (var data of value) {
          let lugar: LugaresBo = new LugaresBo(data);
          let lugarImgs: Array<ImagenesBo> = new Array();
          for (var img of data.imagenes) {
            await self.getImage(img).then(image => {
                lugarImgs.push(new ImagenesBo(image));
              }).catch(error => {
              });
          }
          lugar.imagenes = lugarImgs;
          UtilTool.lugares.push(lugar);

        }
        */

        await LugaresBo.saveAllJson(array).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync Lugares '});
        });

        debugger;


      }).catch(ex => {
          debugger;
          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  /*
  async getImageById(id) {
    await this.getImage(id);
  }
  */

  getImage(id) {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["image"];
      const defaultQuery = [['id', '=', id]];
      self.odoo.search_read('audioguia.imagenes', defaultQuery, fields).then(value => {
        if (value[0]) {
          const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + value[0].image);
          console.log(img);
          resolve({id: value[0].id, image: img['changingThisBreaksApplicationSecurity']});
        } else {
          reject({status: 500, message: 'Error consultando imagen ' + id});
        }
      }).catch(ex => {
          reject({status: 500, message: ex || 'Error consultando imagen ' + id});
        }
      );
    });
  }


  public getLastIdByTableName(tableName: string, where: string): Promise<number> {
    return new Promise((resolve, reject) => {
      let query: string = "select id_odoo from ?";
      if (where != null) {
        query += " where apartado = '" + where + "'";
      }
      query += " order by id_odoo desc limit 1";

      AudioguiaSQLiteHelper.db.executeSql(query, [tableName]).then(data => {
        let count: number = 0;

        if (data.rows.item(0) && data.rows.item(0)['id'])
          count = data.rows.item(0)['id'];

        console.log("LastID " + where + "-" + tableName + ": " + count);

        resolve(count);
      }).catch(ex => {
          reject({status: 500, message: ex || 'Error getLastIdByTableName ' + tableName});
        }
      );
    });
  }


}
