import {Component} from '@angular/core';
import {ViewController, NavController, IonicPage, MenuController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UtilTool} from "../../providers/util";

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers: [UtilTool]
})
export class SplashPage {

  public menu: any;
  public progress: number;
  public label: string;

  constructor(public viewCtrl: ViewController,
              public splashScreen: SplashScreen,
              menu: MenuController,
              public navCtrl: NavController) {

    UtilTool.progressBar.subscribe(data => {
      this.progress = data.progress;
      this.label = data.label;
    });

    UtilTool.closetSplashScreen.subscribe(data => {
      this.splashScreen.hide();
      this.viewCtrl.dismiss();
    });

    this.menu = menu;
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  /*  ionViewDidEnter() {

      this.splashScreen.hide();

      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 4000);

    }*/

}
