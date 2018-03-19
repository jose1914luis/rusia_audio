import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CityBo} from "../../models/CityBo";
import {UtilTool} from "../../providers/util";
import {DomSanitizer} from "@angular/platform-browser";
import {AudioguiaSQLiteHelper} from "../../database/AudioguiaSQLiteHelper";
import {Services} from "../../providers/services/services";


@IonicPage()
@Component({
  selector: 'page-ciudades',
  templateUrl: 'ciudades.html',
  providers: [Services, UtilTool]
})
export class CiudadesPage {
  items: Array<CityBo> = new Array();
  page: number = 1;
  title: string = "Otras ciudades";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilTool,
              public audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              public domSanitizationService: DomSanitizer,
              public services: Services) {

    console.log('entro');

    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.cargarCiudades().then(() => {
      }).catch(() => {
      });
    }).catch();

  }

  openItem(item: CityBo) {
    this.util.launch(item.url);
  }


  // Retorna los producto por pagina
  getDataScroll(infiniteScroll): Promise<any> {
    console.log('Begin async operation');
    this.page = this.page + 1;
    return new Promise((resolve) => {
      this.cargarCiudades().then(() => {
        infiniteScroll.complete();
        resolve();
      });
    });
  }


  async cargarCiudades() {
    await new CityBo().get(this.page).then(async data => {
        for (let city of data) {
          this.items.push(city);
        }
      }
    ).catch(e => {
      console.log('cargarCiudades error ');
      console.log(e);
    });
  }


}
