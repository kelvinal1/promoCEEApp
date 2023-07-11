import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPromotionsRoutingModule } from './list-promotions-routing.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { ListComponent } from './components/list/list.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeAntdModule } from 'src/app/ng-prime.module';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    ListComponent,
    PromotionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListPromotionsRoutingModule,
    NgZorroAntdModule,
    NgPrimeAntdModule,
    GoogleMapsModule
  ]
})
export class ListPromotionsModule { }
