import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, ModalController, Nav, Platform} from 'ionic-angular';

import {FirstRunPage, SplashPage} from '../pages/pages';
import {Settings, Services} from '../providers/providers';
import {UtilTool} from "../providers/util";
import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Audio Guia Rusia</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button menuClose ion-item (click)="openPage({title: 'Home', component: 'MainPage', icon: ''})">
            <ion-icon name="home"></ion-icon>
            Home
          </button>
          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            <ion-icon name="{{p.icon}}"></ion-icon>
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = UtilTool.pages;

  constructor(private translate: TranslateService,
              private platform: Platform,
              private settings: Settings,
              private config: Config,
              private statusBar: StatusBar,
              private services: Services,
              private util: UtilTool,
              private modalCtrl: ModalController,
              private audioguiaSQLiteHelper: AudioguiaSQLiteHelper,
              private splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      const splash = this.modalCtrl.create(SplashPage);
      splash.onDidDismiss(data => {
        console.log(data);
      });
      splash.present();

      this.initSync(util);
    });

    this.initTranslate();

  }

  validSync(): boolean {

    var fecha_last_sync: Date = new Date(localStorage.getItem(this.util.Keys.lastSync));
    var fecha = fecha_last_sync.getDate() + "/" + this.util.padLeft((fecha_last_sync.getMonth() ).toString(), 2, "0") + "/" + fecha_last_sync.getFullYear();

    var current_date = new Date();

    var diff = (current_date.getTime()) - fecha_last_sync.getTime();

    var segundos = diff / 1000;
    var minutos = segundos / 60;
    var horas = minutos / 60;
    var dias = horas / 24;

    console.log("current_date");
    console.log(current_date);

    console.log("diff");
    console.log(diff);

    console.log("segundos");
    console.log(segundos);

    console.log("minutos");
    console.log(minutos);

    console.log("horas");
    console.log(horas);

    console.log("dias");
    console.log(dias);

    console.log("FrecuenciaSincronizacion");
    console.log(5);

/*
    if (horas <= 5)
      return false;
    else
      */
      return true;
  }

  initSync(util) {
    this.audioguiaSQLiteHelper.initDb().then(() => {
      this.services.login().then(
        async () => {

          if (this.validSync()) {

            UtilTool.progressBar.emit({progress: 5, label: 'Obteniendo ciudades...'});
            await this.services.syncCiudades().then(() => {
            }).catch(() => {
            });

            UtilTool.progressBar.emit({progress: 15, label: 'Obteniendo rutas...'});
            await this.services.syncRutas().then(() => {
            }).catch(() => {
            });

            UtilTool.progressBar.emit({progress: 30, label: 'Obteniendo lugares...'});
            await this.services.syncLugares().then(() => {
            }).catch(() => {
            });

            UtilTool.progressBar.emit({progress: 35, label: 'Obteniendo información...'});
            await this.services.syncGeneral(util.Apartados.informacion, "audioguia.informaciones").then(() => {
            }).catch(() => {
            });

            UtilTool.progressBar.emit({progress: 50, label: 'Obteniendo curiosidades del metro...'});
            await this.services.syncGeneral(util.Apartados.curiosidad, "audioguia.curiosidades").then(() => {
            }).catch(() => {
            });


            UtilTool.progressBar.emit({progress: 55, label: 'Obteniendo curiosidades del metro...'});
            await this.services.syncGeneral(util.Apartados.curiosidad_metro, "audioguia.curiosidades.metro").then(() => {
            }).catch(() => {
            });

            UtilTool.progressBar.emit({progress: 70, label: 'Obteniendo estaciones del metro...'});
            await this.services.syncEstacionesMetro().then(() => {
            }).catch(() => {
            });


            UtilTool.progressBar.emit({progress: 85, label: 'Obteniendo esquema del metro...'});
            await this.services.syncGeneral(util.Apartados.esquema, "audioguia.esquema.metro").then(() => {
            }).catch(() => {
            });


            UtilTool.progressBar.emit({progress: 100, label: 'Obteniendo historia del metro...'});
            await this.services.syncGeneral(util.Apartados.historia, "audioguia.historia.metro").then(() => {
            }).catch(() => {
            });

          }
          localStorage.setItem(this.util.Keys.lastSync, (new Date().toISOString()));
          UtilTool.closetSplashScreen.emit(true);
        }
      ).catch(ex => {
        console.log('initSync login');
        console.log(ex);
        UtilTool.closetSplashScreen.emit(true);
      });

    }).catch(ex => {
      console.log('initSync initDb');
      console.log(ex);
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the main nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    //this.nav.setRoot(page.component);
  }
}
