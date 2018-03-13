import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {PlacesPage} from './places';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    PlacesPage
  ]
})
export class CardsPageModule {
}
