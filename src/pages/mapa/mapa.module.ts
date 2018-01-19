import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import {AgmCoreModule} from '@agm/core';

import { MapaPage } from './mapa';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
    TranslateModule.forChild(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNyNgQUOMRW-PbxvXTUv0_bKZJrHB7ycI'
    })
  ],
  exports: [
    MapaPage
  ]
})
export class MapaPageModule {}
