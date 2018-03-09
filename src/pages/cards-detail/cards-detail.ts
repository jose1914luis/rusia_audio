import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-cards-detail',
  templateUrl: 'cards-detail.html',
})
export class CardsDetailPage {

  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    // this.item = navParams.get('item') || items.defaultItemCard;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsDetailPage');
  }

}
