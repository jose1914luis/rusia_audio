import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardsDetailPage } from './cards-detail';

@NgModule({
  declarations: [
    CardsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CardsDetailPage),
  ],
})
export class CardsDetailPageModule {}
