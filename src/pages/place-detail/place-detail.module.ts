import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDetailPage } from './place-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PlaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class PlaceDetailPageModule {}
