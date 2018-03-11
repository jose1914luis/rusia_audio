import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {LugaresPage} from './lugares';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    LugaresPage,
  ],
  imports: [
    IonicPageModule.forChild(LugaresPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    LugaresPage
  ]
})
export class CardsPageModule {
}
