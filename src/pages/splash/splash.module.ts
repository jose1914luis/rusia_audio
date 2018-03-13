import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SplashPage} from './splash';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SplashPage,
  ],
  imports: [
    IonicPageModule.forChild(SplashPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    SplashPage
  ]
})
export class SplashPageModule {
}
