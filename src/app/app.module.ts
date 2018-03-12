import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {Media} from '@ionic-native/media';
import {MusicControls} from '@ionic-native/music-controls';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {Geolocation} from '@ionic-native/geolocation';
import {AgmCoreModule} from '@agm/core';

import {Settings} from '../providers/providers';
import {Api} from '../providers/providers';
import {MyApp} from './app.component';
import {Services} from '../providers/services/services';
import {UtilTool} from "../providers/util";
import {AudioguiaSQLiteHelper} from "../database/AudioguiaSQLiteHelper";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLite} from "@ionic-native/sqlite";
import {
  FavoritosEntry,
  CitysEntry,
  EstacionesEntry,
  GeneralEntry,
  ImagenesEntry,
  LogEnty,
  LogFileEnty,
  LugaresEntry,
  RutasEntry,
  TipoEntry
} from "../database/AudioguiaData";
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: true,
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWx8aDGK_COjz1tDtbNBPUSJyO0w6u4wE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Camera,
    Media,
    MusicControls,
    SplashScreen,
    StatusBar,
    Services,
    UtilTool,
    Geolocation,
    SQLite,
    SQLitePorter,
    AudioguiaSQLiteHelper,
    FavoritosEntry,
    CitysEntry,
    EstacionesEntry,
    GeneralEntry,
    ImagenesEntry,
    LogEnty,
    LogFileEnty,
    LugaresEntry,
    RutasEntry,
    TipoEntry,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
