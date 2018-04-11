import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RutasBo} from "../../models/RutasBo";
import {LugaresBo} from "../../models/LugaresBo";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {

  tipo: string = '';
  itemLugar: LugaresBo = new LugaresBo();
  itemRuta: RutasBo = new RutasBo();

  constructor(public navCtrl: NavController,
              public domSanitizationService: DomSanitizer,
              public navParams: NavParams) {

    this.tipo = this.navParams.get('tipo');
    console.log(this.navParams.get('tipo'));
    console.log(this.navParams.get('item'));
    if (this.tipo === 'routes') {
      this.itemRuta = this.navParams.get('item');
    } else {
      this.itemLugar = this.navParams.get('item');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailPage');
  }

}
