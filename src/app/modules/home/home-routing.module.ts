import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [

  {
    path:'',component:HeaderComponent, children:[
    {path:'load',loadChildren:()=>import('./modules/list-promotions/list-promotions.module').then(m=>m.ListPromotionsModule)},
    {path:'policeman',loadChildren:()=>import('../login/login.module').then(m=>m.LoginModule)},
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
