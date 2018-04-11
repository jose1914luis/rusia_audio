import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UtilTool} from "../../providers/util";
import {DomSanitizer} from "@angular/platform-browser";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {GeneralBo} from "../../models/GeneralBo";
import {Services} from "../../providers/services/services";
import {ImagenesBo} from "../../models/ImagenesBo";
import {Geolocation} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})
export class GeneralPage {

  items: Array<GeneralBo> = new Array();
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
    this.title = this.navParams.get('title');
    if (this.navParams.get('tipo')) {
      this.tipo = this.navParams.get('tipo');
    }

    // this.services.login();
    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.cargarDatos().then(() => {
      }).catch(() => {
      });
    }).catch();

  }

  openItem(item: GeneralBo) {
    this.navCtrl.push('GeneralDetailPage', {
      item: item
    });
  }


  // Retorna los producto por pagina
  getDataScroll(infiniteScroll): Promise<any> {
    console.log('Begin async operation');
    this.page = this.page + 1;
    return new Promise((resolve) => {
      this.cargarDatos().then(() => {
        infiniteScroll.complete();
        resolve();
      });
    });
  }


  async loadImgLocal(obj: GeneralBo) {
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


  async cargarDatos() {
    await new GeneralBo().get(this.page, this.tipo).then(async data => {

        let array: Array<GeneralBo> = new Array();
        if ((data instanceof Array) === false) {
          try {
            array.push(data[0]);
          } catch (e) {
          }
        } else {
          array = data;
        }

        for (let lugar of array) {
          let obj: GeneralBo = lugar;
          this.items.push(obj);
        }

        if (this.util.Apartados.historia === this.tipo) {
          if (this.items.length > 0) {
            this.openItem(this.items[0]);
          }
        }

        if (this.items.length > 0) {
          this.util.pushNotificationProgressBar(100, "Descargando Imagenes", 0);
          for (let general of this.items) {
            let obj: GeneralBo = general;
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
      debugger;
      console.log('cargarDatos error ');
      console.log(e);
    });
  }

}
