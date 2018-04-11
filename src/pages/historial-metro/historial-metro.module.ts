import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HistorialMetroPage} from './historial-metro';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    HistorialMetroPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialMetroPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class HistorialMetroPageModule {
}
