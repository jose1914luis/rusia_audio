import {NgModule} from '@angular/core';
import {CustomHeaderComponent} from './custom-header/custom-header';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [CustomHeaderComponent],
  imports: [IonicModule,
    TranslateModule.forChild()],
  exports: [CustomHeaderComponent]
})
export class ComponentsModule {
}
