import {NgModule} from '@angular/core';
import {CustomHeaderComponent} from './custom-header/custom-header';
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "ionic-angular";
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation';

@NgModule({
  declarations: [CustomHeaderComponent,
    BottomNavigationComponent],
  imports: [IonicModule,
    TranslateModule.forChild()],
  exports: [CustomHeaderComponent,
    BottomNavigationComponent]
})
export class ComponentsModule {
}
