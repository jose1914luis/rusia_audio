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

  items: Array<GeneralBo> = new Array();
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
          if (obj.imagenes !== "0") {
            let img_lugar: Array<ImagenesBo> = new Array();
            for (let id_image of obj.imagenes.split(',')) {
              if (id_image) {
                await new ImagenesBo().getImageById(id_image).then(images => {
                  img_lugar.push(images);
                }).catch(e => {
                  console.log('cargarDatos imagenes error ');
                  console.log(e);
                });
                obj.images_bo = img_lugar;
              }
            }
          }
          this.items.push(obj);
        }
      }
    ).catch(e => {
      debugger;
      console.log('cargarDatos error ');
      console.log(e);
    });
  }
}
