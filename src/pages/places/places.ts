import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Services} from '../../providers/services/services';
import {UtilTool} from "../../providers/util";
import {LugaresBo} from "../../models/LugaresBo";
import {ImagenesBo} from "../../models/ImagenesBo";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {DomSanitizer} from "@angular/platform-browser";
import {Geolocation} from '@ionic-native/geolocation';
import {LugaresEntry} from "../../database/AudioguiaData";
import {RutasBo} from "../../models/RutasBo";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
  providers: [Services, UtilTool]
})
export class PlacesPage {

  lugaresItems: Array<LugaresBo> = new Array();
  filterLugaresItems: Array<LugaresBo> = new Array();

  rutasItems: Array<RutasBo> = new Array();
  filterRutasItems: Array<RutasBo> = new Array();

  page: number = 1;
  latitude: number = 0;
  longitude: number = 0;
  title: string = "";
  tipo: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilTool,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public domSanitizationService: DomSanitizer,
              public geolocation: Geolocation,
              public services: Services) {

    console.log('entro');
    this.title = this.navParams.get('title');
    if (this.navParams.get('tipo')) {
      this.tipo = this.navParams.get('tipo');
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude || 0;
      this.longitude = resp.coords.longitude || 0;
    }).catch((error) => {
      this.latitude = 0;
      this.longitude = 0;
    });

    this.lugaresItems = new Array();
    this.rutasItems = new Array();


    this.audioguiaSQLiteHelper.initDb().then(async () => {
      await this.services.login().then(async () => {
      }).catch();

      this.cargarLugares().then(() => {
      }).catch(() => {
      });
    }).catch();

  }


  openItem(item: any) {
    this.navCtrl.push('PlaceDetailPage', {
      item: item,
      tipo: this.tipo
    });
  }

  orderBy(field: string) {
    if (this.tipo === 'routes') {
      if (field === 'popular') {
        this.rutasItems = this.rutasItems.sort(function (a, b) {
          const genreA = a.name.toUpperCase();
          const genreB = b.name.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
      else if (field === 'alphabetical') {
        this.rutasItems = this.rutasItems.sort(function (a, b) {
          const genreA = a.name.toUpperCase();
          const genreB = b.name.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
      else if (field === 'duration') {
        this.rutasItems = this.rutasItems.sort(function (a, b) {
          const genreA = a.distancia.toUpperCase();
          const genreB = b.distancia.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
    } else {
      if (field === 'popular') {
        this.lugaresItems = this.lugaresItems.sort(function (a, b) {
          const genreA = a.name.toUpperCase();
          const genreB = b.name.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
      else if (field === 'alphabetical') {
        this.lugaresItems = this.lugaresItems.sort(function (a, b) {
          const genreA = a.name.toUpperCase();
          const genreB = b.name.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
      else if (field === 'tipo') {
        this.lugaresItems = this.lugaresItems.sort(function (a, b) {
          const genreA = a.tipo.toUpperCase();
          const genreB = b.tipo.toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
      }
    }
  }


  // Retorna los producto por pagina
  getDataScroll(infiniteScroll): Promise<any> {
    console.log('Begin async operation');
    this.page = this.page + 1;
    return new Promise((resolve) => {
      this.cargarLugares().then(() => {
        infiniteScroll.complete();
        resolve();
      });
    });
  }


  async loadImgLocal(obj: LugaresBo) {
    if (obj.imagenes) {
      let img_lugar: Array<ImagenesBo> = new Array();
      for (let id_image of obj.imagenes.split(',')) {
        if (id_image) {
          await new ImagenesBo().getImageById(id_image).then(images => {
            img_lugar.push(images);
          }).catch(e => {
            console.log('cargarLugares imagenes error ');
            console.log(e);
          });
          obj.images_bo = img_lugar;
        }
      }
    }
  }

  async loadImgLocalRuta(obj: RutasBo) {
    if (obj.imagenes) {
      let img_lugar: Array<ImagenesBo> = new Array();
      for (let id_image of obj.imagenes.split(',')) {
        if (id_image) {
          await new ImagenesBo().getImageById(id_image).then(images => {
            img_lugar.push(images);
          }).catch(e => {
            console.log('cargarLugares imagenes error ');
            console.log(e);
          });
          obj.images_bo = img_lugar;
        }
      }
    }
  }

  async cargarLugares() {
    if (this.tipo === 'routes') {
      await new RutasBo().get(this.page).then(async data => {


          for (let ruta of data) {
            let obj: RutasBo = ruta;
            this.rutasItems.push(obj);
          }

          this.filterRutasItems = this.rutasItems;

          if (this.rutasItems.length > 0) {
            this.util.pushNotificationProgressBar(100, "Descargando Imagenes", 0);
            for (let ruta of this.rutasItems) {
              let obj: RutasBo = ruta;
              if (obj.imagenes) {
                let images: Array<any> = new Array();
                obj.imagenes.split(',').map(img => {
                  if (img) {
                    images.push(img);
                  }
                });
                if (images.length > 0) {
                  await this.services.addImages(images).then(async () => {
                    this.loadImgLocalRuta(obj).then().catch();
                  }).catch(() => {
                    this.loadImgLocalRuta(obj).then().catch();
                  });
                }
              }
            }
            this.util.setProgressBarPushNotification(100, 100);
          }

        }
      ).catch(e => {
        console.log('cargarLugares error ');
        console.log(e);
      });
    }
    else {
      await new LugaresBo().get(this.page, this.tipo).then(async data => {

          for (let lugar of data) {
            let obj: LugaresBo = lugar;
            if (obj.latitud && obj.longitud) {
              await this.getDistance(obj.latitud || 0, obj.longitud || 0).then(distance => {
                obj.distance = distance;
                obj.display_distance = distance.toLocaleString('en-us', {minimumFractionDigits: 0}) + " km";
              }).catch(() => {
              });
            }
            this.lugaresItems.push(obj);
          }


          this.filterLugaresItems = this.lugaresItems;

          if (this.lugaresItems.length > 0) {
            this.util.pushNotificationProgressBar(100, "Descargando Imagenes", 0);
            for (let lugar of this.lugaresItems) {
              let obj: LugaresBo = lugar;
              if (obj.imagenes) {
                let images: Array<any> = new Array();
                obj.imagenes.split(',').map(img => {
                  if (img) {
                    images.push(img);
                  }
                });
                if (images.length > 0) {
                  await this.services.addImages(images).then(async () => {
                    this.loadImgLocal(obj).then().catch();
                  }).catch(() => {
                    this.loadImgLocal(obj).then().catch();
                  });
                }
              }
            }
            this.util.setProgressBarPushNotification(100, 100);
          }

        }
      ).catch(e => {
        console.log('cargarLugares error ');
        console.log(e);
      });
    }
  }


  getDistance(lat: number, lon: number): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(this.util.calculateDistance(this.latitude, this.longitude, lat, lon, 'K'));
    });
  }


  getEvents = (self): any => {
    return {
      'onFilter': function (filter: string) {
        if (this.tipo === 'routes') {
          if (filter.length > 0) {
            this.filterRutasItems = this.filterRutasItems.filter(f => {
              return (f.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                || f.descripcion.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
            });
          } else {
            this.filterRutasItems = this.rutasItems;
          }
        } else {
          if (filter.length > 0) {
            this.filterLugaresItems = this.filterLugaresItems.filter(f => {
              return (f.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                || f.descripcion.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
            });
          } else {
            this.filterLugaresItems = this.lugaresItems;
          }
        }
      }
    };
  };

}
