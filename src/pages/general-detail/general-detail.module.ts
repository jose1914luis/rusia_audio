import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralDetailPage } from './general-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GeneralDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class GeneralDetailPageModule {}
