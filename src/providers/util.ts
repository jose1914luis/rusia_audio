import {EventEmitter, Injectable} from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, Platform, ToastController} from 'ionic-angular';
import {Page} from "../models/pages";
import {LugaresBo} from "../models/LugaresBo";
import {APP_CONFIG} from "../../constants";


@Injectable()
export class UtilTool {


  public static pages: Array<Page> = [
    {title: 'Mapa', component: 'MapaPage', icon: 'icon_map.png'},
    {title: 'Rutas', component: 'CardsPage', icon: 'icon_route.png'},
    {title: 'Lugares de interes', component: 'CardsPage', icon: 'icon_place.png'},
    {title: 'Donde comer', component: 'CardsPage', icon: 'icon_foot.png'},
    {title: 'Donde dormir', component: 'CardsPage', icon: 'icon_sleep.png'},
    {title: 'Otros lugares', component: 'CardsPage', icon: 'icon_place.png'},
    {title: 'Mis favoritos', component: 'CardsPage', icon: 'icon_star.png'},
    {title: 'Información util', component: 'CardsPage', icon: 'icon_info.png'},
    {title: 'Curiosidades', component: 'CardsPage', icon: 'ic_curiosidad.png'},
    {title: 'Historia del metro', component: 'CardsPage', icon: 'ic_historia.png'},
    {title: 'Esquema del metro', component: 'CardsPage', icon: 'ic_esquema.png'},
    {title: 'Estaciones del metro', component: 'CardsPage', icon: 'ic_estaciones.png'},
    {title: 'Curiosidades del metro', component: 'CardsPage', icon: 'ic_curiosidad_metro.png'},
    {title: 'Configuración', component: 'SettingsPage', icon: 'icon_settings.png'},
    {title: 'Otras ciudades', component: 'CardsPage', icon: 'icon_city.png'}
  ];

  public loading: any;
  public static imagenes: Array<any> = new Array();
  public static lugares: Array<LugaresBo> = new Array();


  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController) {


  }


  public getListIds(map): string {
    let ids: string = "";
    for (let id of map) {
      ids += id + ',';
    }
    return ids;
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

  public Toast(text) {
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


  public Confirm(message = 'Please confirm to continue.', confirmText = 'Confirm', cancelText = 'Cancel'): Promise<any> {
    return new Promise((resolve, reject) => {
        let alert = this.alertCtrl.create({
          title: APP_CONFIG.APP_NAME,
          message: message,
          buttons: [
            {
              text: cancelText || 'Cancel',
              role: 'cancel',
              handler: () => {
                reject(new Error(cancelText));
              }
            },
            {
              text: confirmText || 'Confirm',
              handler: () => {
                resolve(confirmText);
              }
            }
          ]
        });
        alert.present();
      }
    )
  }

}
