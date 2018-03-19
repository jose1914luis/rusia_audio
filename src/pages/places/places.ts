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

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
  providers: [Services, UtilTool]
})
export class PlacesPage {

  lugaresItems: Array<LugaresBo> = new Array();
  rutasItems: Array<RutasBo> = new Array();
  page: number = 1;
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

    if (this.navParams.get('tipo')) {
      this.tipo = this.navParams.get('tipo');
    }

    this.lugaresItems = new Array();
    this.rutasItems = new Array();

    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.cargarLugares().then(() => {
      }).catch(() => {
      });
    }).catch();

  }


  openItem(item: LugaresBo) {
    this.navCtrl.push('PlaceDetailPage', {
      item: item
    });
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


  async cargarLugares() {
    if (this.tipo === 'routes') {
      await new RutasBo().get(this.page).then(async data => {

          this.util.LoadingShow();

          let images: Array<any> = new Array();
          data.map((value) => {
            if (value.imagenes) {
              value.imagenes.split(',').map(img => {
                if (img)
                  images.push(img);
              });
            }
          });

          if (images.length > 0) {
            await this.services.login().then(async () => {
              await this.services.addImages(images).then().catch();
            }).catch();
          }

          for (let lugar of data) {
            let obj: RutasBo = lugar;
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

            this.rutasItems.push(obj);
          }
          this.util.LoadingHide();
        }
      ).catch(e => {
        console.log('cargarLugares error ');
        console.log(e);
      });
    } else {
      await new LugaresBo().get(this.page, this.tipo).then(async data => {

          this.util.LoadingShow();

          let images: Array<any> = new Array();
          data.map((value) => {
            if (value.imagenes) {
              value.imagenes.split(',').map(img => {
                if (img)
                  images.push(img);
              });
            }
          });

          if (images.length > 0) {
            await this.services.login().then(async () => {
              await this.services.addImages(images).then().catch();
            }).catch();
          }

          for (let lugar of data) {
            let obj: LugaresBo = lugar;
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
            await this.getDistance(obj.latitud || 0, obj.longitud || 0).then(distance => {
              obj.distance = distance;
              obj.display_distance = distance.toLocaleString('en-us', {minimumFractionDigits: 0});
            }).catch(() => {
            });
            this.lugaresItems.push(obj);
          }
          this.util.LoadingHide();
        }
      ).catch(e => {
        console.log('cargarLugares error ');
        console.log(e);
      });
    }
  }


  getDistance(lat: number, lon: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        debugger;
        // resp.coords.latitude
        // resp.coords.longitude
        resolve(this.util.calculateDistance(resp.coords.latitude, resp.coords.longitude, lat, lon, 'K'));
      }).catch((error) => {
        console.log('Error getting location', error);
        resolve(0);
      });
    });
  }


}
