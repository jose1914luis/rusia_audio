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

    this.audioguiaSQLiteHelper.initDb().then(() => {
    }).catch(() => {
    });
    this.odoo = new OdooApi(APP_CONFIG.SERVER_URL, APP_CONFIG.PROXY || '/api/', APP_CONFIG.DATABASE_NAME);

  }


  login() {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      this.odoo.login(APP_CONFIG.EMAIL, APP_CONFIG.PASS_EMAIL).then((uid) => {
        debugger;
        resolve(uid);
      }).catch(ex => {
          debugger;
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

        debugger;
        let newArray: Array<ILugar> = new Array();
        let updateArray: Array<ILugar> = new Array();
        let item: LugaresBo = null;

        for (var data of value) {
          item = new LugaresBo(data);
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
            icon_marker: item.icon_marker,
            audio_name: item.audio_name
          };
          await LugaresBo.exist(item.id_odoo).then(exist => {
            if (exist) {
              updateArray.push(lugar);
            }
            else {
              newArray.push(lugar);
            }
          }).catch(() => {
          });


          await this.addIdsImages(item.imagenes).then(() => {
          }).catch(() => {
          });
        }

        await LugaresBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync Lugares '});
        });

      }).catch(ex => {
          debugger;
          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  addIdsImages(ids: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ids) {
        let arrayIds: Array<string> = ids.split(",");
        if (arrayIds.length > 0) {
          for (let img of arrayIds) {
            new ImagenesBo().exist(img).then(async exist => {
              if (exist === false) {
                await new ImagenesBo().insert(img).then().catch();
              }
              await this.getImage(img).then(async image => {
                await new ImagenesBo().update(image).then(() => {
                  resolve();
                }).catch(ex => {
                  reject();
                });
              }).catch(ex => {
                reject();
              });
            }).catch(ex => {
              reject();
            });
          }
        }
      }
    });
  }

  getImage(id: string): Promise<ImagenesBo> {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["image"];
      const defaultQuery = [['id', '=', id]];
      self.odoo.search_read('audioguia.imagenes', defaultQuery, fields).then(value => {
        if (value[0]) {
          const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + value[0].image);
          console.log(img);
          resolve(new ImagenesBo({
            id: value[0].id,
            id_odoo: value[0].id,
            image: img['changingThisBreaksApplicationSecurity']
          }));
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
