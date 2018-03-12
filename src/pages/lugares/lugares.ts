import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Services} from '../../providers/services/services';
import {Item} from '../../models/item';
import {UtilTool} from "../../providers/util";
import {LugaresBo} from "../../models/LugaresBo";
import {ImagenesBo} from "../../models/ImagenesBo";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {DomSanitizer} from "@angular/platform-browser";
import {Geolocation} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-lugares',
  templateUrl: 'lugares.html',
  providers: [Services, UtilTool]
})
export class LugaresPage {

  lugaresItems: Array<LugaresBo> = new Array();
  page: number = 1;
  title: string = "";

  constructor(public navCtrl: NavController,
              public util: UtilTool,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public domSanitizationService: DomSanitizer,
              public geolocation: Geolocation,
              public services: Services) {

    console.log('entro');
    // this.services.login();
    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.cargarLugares();
    }).catch();

  }

  openItem(item: Item) {
    this.navCtrl.push('CardsDetailPage', {
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
    await new LugaresBo().get(this.page).then(async data => {
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
