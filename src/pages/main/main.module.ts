import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {MainPage} from './main';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    MainPage
  ]
})
export class ContentPageModule {
}
