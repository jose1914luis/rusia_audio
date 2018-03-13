import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import {UtilTool} from "../../providers/util";
import {Page} from "../../models/pages";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MainPage';

  pages: Array<Page> = new Array();

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = UtilTool.pages;
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page: Page) {
    // Reset the main nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
