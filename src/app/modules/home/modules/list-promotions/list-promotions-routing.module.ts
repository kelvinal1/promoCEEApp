import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { PromotionComponent } from './components/promotion/promotion.component';

const routes: Routes = [

  { path:'list/:cluster/:company/:country',component:ListComponent },
  { path:'promotion/:cod',component:PromotionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPromotionsRoutingModule { }
