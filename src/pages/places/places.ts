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

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
  providers: [Services, UtilTool]
})
export class PlacesPage {

  lugaresItems: Array<LugaresBo> = new Array();
  page: number = 1;
  title: string = "";
  tipo: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilTool,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public domSanitizationService: DomSanitizer,
              public lugaresEntry: LugaresEntry,
              public geolocation: Geolocation,
              public services: Services) {

    console.log('entro');

    if (this.navParams.get('tipo')) {
      this.tipo = this.navParams.get('tipo');
    }

    // this.services.login();
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

  getFiltrosLugares(): string {
    if (this.tipo === 'comer')
      return  " WHERE " + this.lugaresEntry.COMER + " = 'true' ";
    else if (this.tipo === 'dormir')
      return " WHERE " + this.lugaresEntry.DORMIR + " = 'true' ";
    else if (this.tipo === 'interes')
      return " WHERE " + this.lugaresEntry.INTERES + " = 'true' ";
    else if (this.tipo === 'otros')
      return " WHERE " + this.lugaresEntry.COMER + " = 'false' AND " + this.lugaresEntry.DORMIR + " = 'false' AND " + this.lugaresEntry.INTERES + " = 'false' ";
    else
      return "";
  }

  async cargarLugares() {
    if (this.tipo === 'routes') {

    } else {
      await new LugaresBo().get(this.page, this.getFiltrosLugares()).then(async data => {
          for (let lugar of data) {
            let obj: LugaresBo = lugar;
            if (obj.imagenes !== "0") {
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
