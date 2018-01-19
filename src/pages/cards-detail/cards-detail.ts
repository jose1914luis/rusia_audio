import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
/**
 * Generated class for the CardsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cards-detail',
  templateUrl: 'cards-detail.html',
})
export class CardsDetailPage {

  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItemCard;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsDetailPage');
  }

}
