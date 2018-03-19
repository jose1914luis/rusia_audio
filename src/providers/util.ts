import {EventEmitter, Injectable} from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, Platform, ToastController} from 'ionic-angular';
import {Page} from "../models/pages";
import {LugaresBo} from "../models/LugaresBo";
import {APP_CONFIG} from "../../constants";
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Injectable()
export class UtilTool {

  public static progressBar: EventEmitter<{ progress: number, label: string }> = new EventEmitter();
  public static closetSplashScreen: EventEmitter<boolean> = new EventEmitter();

  public Apartados = {
    informacion: "informacion",
    curiosidad: "curiosidad",
    curiosidad_metro: "curiosidad_metro",
    esquema: "esquema",
    historia: "historia"
  };

  public Keys = {
    lastSync: "lastSync"
  };

  public static pages: Array<Page> = [
    {title: 'Mapa', component: 'MapaPage', icon: 'icon_map.png', params: {title: 'Mapa'}},
    {title: 'Rutas', component: 'PlacesPage', icon: 'icon_route.png', params: {title: 'Rutas', tipo: 'routes'}},
    {
      title: 'Lugares de interes',
      component: 'PlacesPage',
      icon: 'icon_place.png',
      params: {title: 'Lugares de interes', tipo: 'interes'}
    },
    {
      title: 'Donde comer',
      component: 'PlacesPage',
      icon: 'icon_foot.png',
      params: {title: 'Donde comer', tipo: 'comer'}
    },
    {
      title: 'Donde dormir',
      component: 'PlacesPage',
      icon: 'icon_sleep.png',
      params: {title: 'Donde dormir', tipo: 'dormir'}
    },
    {
      title: 'Otros places',
      component: 'PlacesPage',
      icon: 'icon_place.png',
      params: {title: 'Otros places', tipo: 'otros'}
    },
    {
      title: 'Mis favoritos',
      component: 'PlacesPage',
      icon: 'icon_star.png',
      params: {title: 'Mis favoritos', tipo: 'favoritos'}
    },
    {
      title: 'Información util',
      component: 'GeneralPage',
      icon: 'icon_info.png',
      params: {title: 'Información util', tipo: 'informacion'}
    },
    {
      title: 'Curiosidades',
      component: 'GeneralPage',
      icon: 'ic_curiosidad.png',
      params: {title: 'Curiosidades', tipo: 'curiosidad'}
    },
    {
      title: 'Historia del metro',
      component: 'GeneralPage',
      icon: 'ic_historia.png',
      params: {title: 'Historia del metro', tipo: 'historia'}
    },
    {
      title: 'Esquema del metro',
      component: 'EsquemaMetroPage',
      icon: 'ic_esquema.png',
      params: {title: 'Esquema del metro'}
    },
    {
      title: 'Estaciones del metro',
      component: 'GeneralPage',
      icon: 'ic_estaciones.png',
      params: {title: 'Estaciones del metro'}
    },
    {
      title: 'Curiosidades del metro',
      component: 'GeneralPage',
      icon: 'ic_curiosidad_metro.png',
      params: {title: 'Curiosidades del metro', tipo: 'curiosidad_metro'}
    },
    {title: 'Configuración', component: 'SettingsPage', icon: 'icon_settings.png', params: {title: 'Configuración'}},
    {title: 'Otras ciudades', component: 'CiudadesPage', icon: 'icon_city.png', params: {title: 'Otras ciudades'}}
  ];

  public loading: any;
  public static imagenes: Array<any> = new Array();
  public static lugares: Array<LugaresBo> = new Array();


  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public iab: InAppBrowser) {


  }


  public padLeft(str: string, max: number, pad: string): string {
    return str.length < max ? this.padLeft(pad + str, max, pad) : str;
  }

  public launch(url) {
    const browser = this.iab.create(url, '_system', 'location=no,clearcache=yes,clearsessioncache=yes');
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


  public LoadingShow(msg: string = "Procesando....") {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

  public LoadingHide() {
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


  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist
  }

}
