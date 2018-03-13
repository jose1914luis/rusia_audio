import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {UtilTool} from "../../providers/util";
import {Page} from "../../models/pages";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  pages: any[] = UtilTool.pages;

  constructor(public navCtrl: NavController) {
  }

  openPage(page: Page) {
    this.navCtrl.push(page.component, page.params);
  }

  getElemento() {

    let triples = [];
    let length = this.pages.length;
    for (let i = 0; i < length; i += 3) {

      let trio = [];
      trio.push(this.pages[i]);

      if (i + 1 < length) {
        trio.push(this.pages[i + 1]);
      }

      if (i + 2 < length) {
        trio.push(this.pages[i + 2]);
      }

      triples.push(trio);
    }

    if (length % 2 == 1)
      triples.push([]);

    return triples;
  }

}
