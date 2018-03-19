import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GeneralBo} from "../../models/GeneralBo";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-general-detail',
  templateUrl: 'general-detail.html',
})
export class GeneralDetailPage {

  item: GeneralBo = new GeneralBo();

  constructor(public navCtrl: NavController,
              public domSanitizationService: DomSanitizer,
              public navParams: NavParams) {
    this.item = new GeneralBo(navParams.get('item'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralDetailPage');
  }

}
