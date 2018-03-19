import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../../constants";
import {DomSanitizer} from '@angular/platform-browser';
import {UtilTool} from "../util";
import {CitysEntry, EstacionesEntry, GeneralEntry, LugaresEntry, RutasEntry} from "../../database/AudioguiaData";
import {ILugar} from "../../interface/ILugar";
import {LugaresBo} from "../../models/LugaresBo";
import {ImagenesBo} from "../../models/ImagenesBo";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {IRuta} from "../../interface/IRuta";
import {RutasBo} from "../../models/RutasBo";
import {IEstacion} from "../../interface/IEstacion";
import {EstacionesBo} from "../../models/EstacionesBo";
import {IGeneral} from "../../interface/IGeneral";
import {GeneralBo} from "../../models/GeneralBo";
import {ICity} from "../../interface/ICity";
import {CityBo} from "../../models/CityBo";

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


  async login() {
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      this.odoo.login(APP_CONFIG.EMAIL, APP_CONFIG.PASS_EMAIL).then((uid) => {
        resolve(uid);

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error consultando places '});
        }
      );
    });
  }

  async syncLugares() {

    let lastId = '0';
    await this.getLastIdByTableName(new LugaresEntry().TABLE_NAME, '').then(id => {
      lastId = id;
    });

    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["name", "descripcion", "score", "direccion", "horario", "precio_entrada", "latitud", "longitud", "tipo", "comer", "dormir", "interes", "es_gratis", "imagenes", "rutas_ids", "lugares_ids", "audio_name", "url"];
      const defaultQuery = [['id', '>', lastId], ['city_id', '=', APP_CONFIG.CITY_ID]];
      self.odoo.search_read('audioguia.lugares', defaultQuery, fields).then(async value => {
        console.log(value);


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


          /*     await this.addIdsImages(item.imagenes).then(() => {
               }).catch(() => {
               });*/
        }

        /*
         let images: Array<any> = new Array();
         newArray.map((value) => {
           if (value.imagenes) {
             value.imagenes.split(',').map(img => {
               if (img)
                 images.push(img);
               // images.push(['id', '=', img]);
             });
           }
         });
         updateArray.map((value) => {
           if (value.imagenes) {
             value.imagenes.split(',').map(img => {
               if (img)
                 images.push(img);
               // images.push(['id', '=', img]);
             });
           }
         });

         await this.addImages(images).then(() => {
         }).catch(() => {
         });
        */

        await LugaresBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync Lugares '});
        });

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  async syncRutas() {

    let lastId = '0';
    await this.getLastIdByTableName(new RutasEntry().TABLE_NAME, '').then(id => {
      lastId = id;
    });

    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["name", "descripcion", "imagenes", "lugares_ids", "score", "distancia",
        "ruta", "es_gratis", "precio", "rutas_ids", "duracion", "audio_name"];
      const defaultQuery = [['id', '>', lastId], ['city_id', '=', APP_CONFIG.CITY_ID]];
      self.odoo.search_read('audioguia.rutas', defaultQuery, fields).then(async value => {
        console.log(value);


        let newArray: Array<IRuta> = new Array();
        let updateArray: Array<IRuta> = new Array();
        let item: RutasBo = null;

        for (var data of value) {
          item = new RutasBo(data);
          item.imagenes = this.util.getListIds(data.imagenes);
          const lugar: IRuta = {
            id: 0,
            id_odoo: item.id,
            name: item.name,
            descripcion: item.descripcion,
            score: item.score,
            duracion: item.duracion,
            ruta: item.ruta,
            es_gratis: item.es_gratis,
            imagenes: item.imagenes,
            rutas: item.rutas,
            lugares: item.lugares,
            distancia: item.distancia
          };
          await RutasBo.exist(item.id_odoo).then(exist => {
            if (exist) {
              updateArray.push(lugar);
            }
            else {
              newArray.push(lugar);
            }
          }).catch(() => {
          });

          /*
          await this.addIdsImages(item.imagenes).then(() => {
          }).catch(() => {
          });*/
        }

        /*
         let images: Array<any> = new Array();
            newArray.map((value) => {
              if (value.imagenes) {
                value.imagenes.split(',').map(img => {
                  if (img)
                    images.push(img);
                  // images.push(['id', '=', img]);
                });
              }
            });
            updateArray.map((value) => {
              if (value.imagenes) {
                value.imagenes.split(',').map(img => {
                  if (img)
                    images.push(img);
                  // images.push(['id', '=', img]);
                });
              }
            });
            await this.addImages(images).then(() => {
            }).catch(() => {
            });
          */

        await RutasBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync RutasBo '});
        });

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  async syncCiudades() {

    let lastId = '0';
    await this.getLastIdByTableName(new CitysEntry().TABLE_NAME, '').then(id => {
      lastId = id;
    });

    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["image", "name", "url"];
      const defaultQuery = [['id', '>', lastId]];
      self.odoo.search_read('audioguia.ciudades', defaultQuery, fields).then(async value => {
        console.log(value);


        let newArray: Array<ICity> = new Array();
        let updateArray: Array<ICity> = new Array();
        let item: CityBo = null;

        for (var data of value) {
          item = new CityBo(data);
          const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + item.image);
          console.log(img);
          const objCity: ICity = {
            id: 0,
            id_odoo: item.id,
            name: item.name,
            url: item.url,
            image: img['changingThisBreaksApplicationSecurity']
          };
          await CityBo.exist(item.id_odoo).then(exist => {
            if (exist) {
              updateArray.push(objCity);
            }
            else {
              newArray.push(objCity);
            }
          }).catch(() => {
          });
        }


        await CityBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync RutasBo '});
        });

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  async syncEstacionesMetro() {
    let lastId = '0';
    await this.getLastIdByTableName(new EstacionesEntry().TABLE_NAME, '').then(id => {
      lastId = id;
    });
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["name", "descripcion", "score", "precio", "es_gratis", "imagenes", "audio_name", "write_date"];
      const defaultQuery = [['id', '>', lastId], ['city_id', '=', APP_CONFIG.CITY_ID]];
      self.odoo.search_read('audioguia.estaciones', defaultQuery, fields).then(async value => {
        console.log(value);

        let newArray: Array<IEstacion> = new Array();
        let updateArray: Array<IEstacion> = new Array();
        let item: EstacionesBo = null;

        for (var data of value) {
          item = new EstacionesBo(data);
          item.imagenes = this.util.getListIds(data.imagenes);
          const lugar: IEstacion = {
            id: 0,
            id_odoo: item.id,
            name: item.name,
            descripcion: item.descripcion,
            imagenes: item.imagenes,
            score: item.score,
            precio: item.precio,
            es_gratis: item.es_gratis
          };

          await EstacionesBo.exist(item.id_odoo).then(exist => {
            if (exist) {
              updateArray.push(lugar);
            }
            else {
              newArray.push(lugar);
            }
          }).catch(() => {
          });

          /*    await this.addIdsImages(item.imagenes).then(() => {
              }).catch(() => {
              });*/
        }

        /*
        let images: Array<any> = new Array();
        newArray.map((value) => {
          if (value.imagenes) {
            value.imagenes.split(',').map(img => {
              if (img)
                images.push(img);
              // images.push(['id', '=', img]);
            });
          }
        });
        updateArray.map((value) => {
          if (value.imagenes) {
            value.imagenes.split(',').map(img => {
              if (img)
                images.push(img);
              // images.push(['id', '=', img]);
            });
          }
        });
        await this.addImages(images).then(() => {
        }).catch(() => {
        });
        */

        await EstacionesBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync EstacionesBo '});
        });

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  async syncGeneral(apartado: string, tableApi: string) {
    let lastId = '0';
    await this.getLastIdByTableName(new GeneralEntry().TABLE_NAME, apartado).then(id => {
      lastId = id;
    });
    return new Promise((resolve, reject) => {
      let self = this;
      self.odoo = this.odoo;
      const fields = ["name", "descripcion", "imagenes", "audio_name"];
      const defaultQuery = [['id', '>', lastId], ['city_id', '=', APP_CONFIG.CITY_ID]];
      self.odoo.search_read(tableApi, defaultQuery, fields).then(async value => {
        console.log(value);


        let newArray: Array<IGeneral> = new Array();
        let updateArray: Array<IGeneral> = new Array();
        let item: GeneralBo = null;

        for (var data of value) {
          item = new GeneralBo(data);
          item.imagenes = this.util.getListIds(data.imagenes);
          const lugar: IGeneral = {
            id: 0,
            id_odoo: item.id,
            name: item.name,
            descripcion: item.descripcion,
            imagenes: item.imagenes,
            apartado: apartado
          };

          await GeneralBo.exist(item.id_odoo).then(exist => {
            if (exist) {
              updateArray.push(lugar);
            }
            else {
              newArray.push(lugar);
            }
          }).catch(() => {
          });

          /*
            await this.addIdsImages(item.imagenes).then(() => {
             }).catch(() => {
             });
          */
        }

        /*
        let images: Array<any> = new Array();
        newArray.map((value) => {
          if (value.imagenes) {
            value.imagenes.split(',').map(img => {
              if (img)
                images.push(img);
              // images.push(['id', '=', img]);
            });
          }
        });
        updateArray.map((value) => {
          if (value.imagenes) {
            value.imagenes.split(',').map(img => {
              if (img)
                images.push(img);
              // images.push(['id', '=', img]);
            });
          }
        });
        await this.addImages(images).then(() => {
        }).catch(() => {
        });
        */

        await GeneralBo.saveAllJson(newArray, updateArray).then(success => {
          resolve(true);
        }).catch(ex => {
          reject({status: 500, message: ex || 'Error Sync GeneralBo ' + apartado});
        });

      }).catch(ex => {

          reject({status: 500, message: ex || 'Error autenticación login '});
        }
      );
    });
  }

  async addIdsImages(ids: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ids) {
        let arrayIds: Array<string> = ids.split(",");
        if (arrayIds.length > 0) {
          for (let img of arrayIds) {
            if (!img) {
              continue;
            }
            new ImagenesBo().exist(img).then(async exist => {
              if (!exist.id_odoo) {
                await new ImagenesBo().insert(img).then().catch();
              }
              if (!exist.image) {
                await this.getImage(img).then(async image => {
                  await new ImagenesBo().update(image).then(() => {
                    resolve();
                  }).catch(ex => {
                    reject();
                  });
                }).catch(ex => {
                  reject();
                });
              }
            }).catch(ex => {
              reject();
            });
          }
        }
        resolve();
      } else {
        reject();
      }
    });
  }

  getImage(id: string): Promise<ImagenesBo> {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject({status: 500, message: 'Error consultando imagen ' + id});
      }
      let self = this;
      self.odoo = this.odoo;
      const fields = ["image"];
      const defaultQuery = [['id', '=', id]];
      self.odoo.search_read('audioguia.imagenes', defaultQuery, fields).then(async value => {

        if (value) {

        }
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


  /*
    async addImages(where: Array<any>) {
      return new Promise(async (resolve, reject) => {
        console.log('where');
        console.log(where);
        if (where.length === 0) {
          reject({status: 500, message: 'Error consultando array imagen '});
        }
        for (var conditional of where) {
          let self = this;
          self.odoo = this.odoo;
          const fields = ["image"];
          const defaultQuery = [conditional];
          console.log('defaultQuery');
          console.log(defaultQuery);
          await self.odoo.search_read('audioguia.imagenes', defaultQuery, fields).then(async value => {
            let data = value[0];

            const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + data.image);
            console.log(img);
            let imagen: ImagenesBo = new ImagenesBo({
              id: data.id,
              id_odoo: data.id,
              image: img['changingThisBreaksApplicationSecurity']
            });

            let im = new ImagenesBo();
            await im.exist(data.id).then(async exist => {
              if (!exist.id_odoo) {
                await new ImagenesBo().insert(data.id, imagen.image).then().catch();
              }
              else {
                await new ImagenesBo().update(imagen).then().catch();
              }
            }).catch(ex => {
            });

          }).catch(ex => {
              reject({status: 500, message: ex || 'Error consultando array imagen '});
            }
          );
        }

        resolve(true);
      });

    }
  */

  /*
    addImages(where: Array<any>): Promise<boolean> {
      return new Promise((resolve, reject) => {
        console.log('where');
        console.log(where);
        if (where.length === 0) {
          reject({status: 500, message: 'Error consultando array imagen '});
        }

        let self = this;
        self.odoo = this.odoo;
        const fields = ["image"];
        const defaultQuery = [where];
        console.log('defaultQuery');
        console.log(defaultQuery);
        self.odoo.search_read('audioguia.imagenes', defaultQuery, fields).then(value => {

          for (var data of value) {
            const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + data.image);
            console.log(img);
            let imagen: ImagenesBo = new ImagenesBo({
              id: data.id,
              id_odoo: data.id,
              image: img['changingThisBreaksApplicationSecurity']
            });

            let im = new ImagenesBo();
            im.exist(data.id).then(async exist => {
              if (!exist.id_odoo) {
                await new ImagenesBo().insert(data.id, imagen.image).then().catch();
              }
              else {
                await new ImagenesBo().update(imagen).then().catch();
              }
            }).catch(ex => {
            });
          }

          resolve(true);

        }).catch(ex => {
            reject({status: 500, message: ex || 'Error consultando array imagen '});
          }
        );

      });

    }
    */

  addImages(where: Array<any>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('where');
      console.log(where);
      if (where.length === 0) {
        reject({status: 500, message: 'Error consultando array imagen '});
      }

      let self = this;
      self.odoo = this.odoo;
      const fields = ["image"];
      const defaultQuery = where;
      console.log('defaultQuery');
      console.log(defaultQuery);
      console.log('ide');
      console.log(where);
      self.odoo.search_read('audioguia.imagenes', [['id', 'in', where]], fields).then(value => {

        for (var data of value) {
          const img = self.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + data.image);
          console.log(img);
          let imagen: ImagenesBo = new ImagenesBo({
            id: data.id,
            id_odoo: data.id,
            image: img['changingThisBreaksApplicationSecurity']
          });

          imagen.exist(data.id).then(async exist => {
            if (!exist.id_odoo)
              await new ImagenesBo().insert(data.id).then().catch();

            await new ImagenesBo().update(imagen).then().catch();

          }).catch(ex => {
          });
        }

        resolve(true);

      }).catch(ex => {
          reject({status: 500, message: ex || 'Error consultando array imagen '});
        }
      );

    });

  }

  public getLastIdByTableName(tableName: string, where: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let query: string = "SELECT MAX(id_odoo) as id_odoo FROM " + tableName;
      if (where) {
        query += " WHERE apartado = '" + where + "' ";
      }
      query += " ORDER BY id_odoo DESC LIMIT 1";

      AudioguiaSQLiteHelper.db.executeSql(query, []).then(data => {
        let count: string = '0';

        if (data.rows.item(0) && data.rows.item(0)['id_odoo'])
          count = data.rows.item(0)['id_odoo'];

        console.log("LastID " + where + "-" + tableName + ": " + count);

        resolve(count);
      }).catch(ex => {

          reject({status: 500, message: ex || 'Error getLastIdByTableName ' + tableName});
        }
      );
    });
  }


}
