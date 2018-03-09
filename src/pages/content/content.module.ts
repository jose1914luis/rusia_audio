import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {ContentPage} from './content';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    ContentPage
  ]
})
export class ContentPageModule {
}
