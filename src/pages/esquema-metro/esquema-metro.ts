import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GeneralBo} from "../../models/GeneralBo";
import {UtilTool} from "../../providers/util";
import {ImagenesBo} from "../../models/ImagenesBo";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-esquema-metro',
  templateUrl: 'esquema-metro.html',
  providers: [UtilTool]
})
export class EsquemaMetroPage {

  item: GeneralBo = new GeneralBo();
  img: string = null;
  page: number = 1;
  title: string = "";

  constructor(public navCtrl: NavController,
              public util: UtilTool,
              public domSanitizationService: DomSanitizer,
              public navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.cargarDatos();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EsquemaMetroPage');
  }

  async cargarDatos() {
    await new GeneralBo().get(this.page, this.util.Apartados.esquema).then(async data => {
        try {
          this.item = data[0];
        } catch (e) {
        }
      }
    ).catch(e => {
      debugger;
      console.log('cargarDatos error ');
      console.log(e);
    });
  }
}
