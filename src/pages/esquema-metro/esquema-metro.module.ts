import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsquemaMetroPage } from './esquema-metro';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    EsquemaMetroPage,
  ],
  imports: [
    IonicPageModule.forChild(EsquemaMetroPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class EsquemaMetroPageModule {}
