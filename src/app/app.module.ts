import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './ng-zorro.module';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { InterceptorService } from './core/interceptor.service';
import { NgPrimeAntdModule } from './ng-prime.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'


registerLocaleData(es);
const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};
const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NgPrimeAntdModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
