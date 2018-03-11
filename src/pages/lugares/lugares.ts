import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Services} from '../../providers/services/services';
import {Item} from '../../models/item';
import {UtilTool} from "../../providers/util";
import {LugaresBo} from "../../models/LugaresBo";
import {ImagenesBo} from "../../models/ImagenesBo";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'lugares.html',
  providers: [Services, UtilTool]
})
export class LugaresPage {

  lugaresItems: Array<LugaresBo> = new Array();
  page: number = 1;

  constructor(public navCtrl: NavController,
              public util: UtilTool,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public domSanitizationService: DomSanitizer,
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
          let obj: LugaresBo = new LugaresBo(lugar);
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
          this.lugaresItems.push(obj);
        }
      }
    ).catch(e => {
      console.log('cargarLugares error ');
      console.log(e);
    });
  }
}
