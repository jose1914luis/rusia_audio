import {NgModule} from '@angular/core';
import {CustomHeaderComponent} from './custom-header/custom-header';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "ionic-angular";
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
  declarations: [CustomHeaderComponent,
    ProgressBarComponent],
  imports: [IonicModule,
    TranslateModule.forChild()],
  exports: [CustomHeaderComponent,
    ProgressBarComponent]
})
export class ComponentsModule {
}
