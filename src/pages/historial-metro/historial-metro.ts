import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GeneralBo} from "../../models/GeneralBo";
import {UtilTool} from "../../providers/util";
import {ImagenesBo} from "../../models/ImagenesBo";
import {DomSanitizer} from "@angular/platform-browser";
import {Services} from "../../providers/providers";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";


@IonicPage()
@Component({
  selector: 'page-historial-metro',
  templateUrl: 'historial-metro.html',
  providers: [UtilTool]
})
export class HistorialMetroPage {

  item: GeneralBo = new GeneralBo();
  img: string = null;
  page: number = 1;
  title: string = "";

  constructor(public navCtrl: NavController,
              public util: UtilTool,
              public domSanitizationService: DomSanitizer,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public services: Services,
              public navParams: NavParams) {

    this.title = this.navParams.get('title');
    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.cargarDatos().then(() => {
      }).catch(() => {
      });
    }).catch();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialMetroPage');
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
    await new GeneralBo().get(this.page, this.util.Apartados.historia).then(async data => {

        try {
          this.item = data[0];
        } catch (e) {
        }

        const img = this.item.imagenes.split(',');

        if (img.length > 0) {
          this.util.pushNotificationProgressBar(100, "Descargando Imagenes", 0);

          await this.services.addImages(img).then(async () => {
            this.loadImgLocal(this.item).then().catch();
          }).catch(() => {
            this.loadImgLocal(this.item).then().catch();
          });

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
