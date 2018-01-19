import {EventEmitter, Injectable} from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, Platform, ToastController} from 'ionic-angular';
import {Page} from "../models/pages";


@Injectable()
export class UtilTool {


  public static pages: Array<Page> = [
    {title: 'Mapa', component: 'MapaPage', icon: 'map'},
    {title: 'Rutas', component: 'CardsPage', icon: 'compass'},
    {title: 'Lugares de interes', component: 'CardsPage', icon: 'locate'},
    {title: 'Donde comer', component: 'CardsPage', icon: 'pizza'},
    {title: 'Donde dormir', component: 'CardsPage', icon: 'alarm'},
    {title: 'Otros lugares', component: 'CardsPage', icon: 'locate'},
    {title: 'Mis favoritos', component: 'CardsPage', icon: 'star'},
    {title: 'Informacion util', component: 'CardsPage', icon: 'information-circle'},
    {title: 'Curiosidades', component: 'CardsPage', icon: 'search'},
    {title: 'Historia del metro', component: 'CardsPage', icon: 'stopwatch'},
    {title: 'Esquema del metro', component: 'CardsPage', icon: 'git-network'},
    {title: 'Estaciones del metro', component: 'CardsPage', icon: 'train'},
    {title: 'Curiosidades del metro', component: 'CardsPage', icon: 'bus'},
    {title: 'Configuracion', component: 'SettingsPage', icon: 'settings'},
    {title: 'Otras ciudades', component: 'CardsPage', icon: 'md-globe'}
  ];


  public loading: any;


  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController) {


  }


  public getRandom(): string {
    return Math.random().toString(36).substr(2, 8).toString().toUpperCase();
  }


  //VALIDA QUE EL EMAIL SEA VALIDO
  public isEmailValid(val: string): boolean | Promise<boolean> {
    if (val.indexOf('@') >= 0 && val.indexOf('.') >= 0)
      return true;
    else
      return false;
  }


  public showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Procesando....'
    });

    this.loading.present();
  }

  public hideLoader() {
    this.loading.dismiss().catch(() => {
    });
  }

  public showDialog(message) {
    let alert = this.alertCtrl.create({
      title: 'Fianzacrédito',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public showToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  public isNullOrEmpty(val): boolean {
    if (val == '' || val == null || val == undefined)
      return true;
    else
      false;
  }


  showConfirm(message: string, onsuccess: any, oncancel: any) {
    let alert = this.alertCtrl.create({
      title: 'Audio Guia',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            // alert.dismiss();
            oncancel('0');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Buy clicked');
            onsuccess('1');
          }
        }
      ]
    });
    alert.present();
  }

}
