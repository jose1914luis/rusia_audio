import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CiudadesPage } from './ciudades';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CiudadesPage,
  ],
  imports: [
    IonicPageModule.forChild(CiudadesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CiudadesPageModule {}
