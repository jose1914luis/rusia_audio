import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralPage } from './general';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class GeneralPageModule {}
