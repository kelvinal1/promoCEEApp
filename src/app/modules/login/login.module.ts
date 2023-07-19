import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),

  ]
})
export class LoginModule { }
