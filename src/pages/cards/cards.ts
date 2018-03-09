import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Services} from '../../providers/services/services';
import {Item} from '../../models/item';
import {UtilTool} from "../../providers/util";
import {LugaresBo} from "../../models/LugaresBo";

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
  providers: [Services, UtilTool]
})
export class CardsPage {

  cardItems: Array<LugaresBo> = new Array();
  page: number = 1;

  constructor(public navCtrl: NavController,
              public util: UtilTool,
              public services: Services) {

    console.log('entro');
    this.cargarLugares();
    /*
        this.services.login().then(() => {
          this.services.getLugares().then((lugares) => {
            debugger;
          }).catch(error => {
            this.util.Toast(error.message);
          });
        }).catch(error => {
          this.util.Toast(error.message);
        });
    */

    /*this.cardItems = [
      {
        user: {
          avatar: 'assets/img/marty-avatar.png',
          name: 'Marty McFly'
        },
        date: 'November 5, 1955',
        image: 'assets/img/advance-card-bttf.png',
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      },
      {
        user: {
          avatar: 'assets/img/sarah-avatar.png.jpeg',
          name: 'Sarah Connor'
        },
        date: 'May 12, 1984',
        image: 'assets/img/advance-card-tmntr.jpg',
        content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
      },
      {
        user: {
          avatar: 'assets/img/ian-avatar.png',
          name: 'Dr. Ian Malcolm'
        },
        date: 'June 28, 1990',
        image: 'assets/img/advance-card-jp.jpg',
        content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
      }
    ];*/

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
    await new LugaresBo().get(this.page).then(data => {
      data.map(lugar => this.cardItems.push(new LugaresBo(lugar)));
    }).catch(error => {
    });
  }
}
