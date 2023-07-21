import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';


export const getBaseUrl = () => environment.apiUrl;
export const getDefaultToken = () => environment.apiUrl;
const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'DEFAULT_TOKEN', useFactory: getDefaultToken, deps: [] },
];

if (environment.production) {
  enableProdMode();
  if (window) {
    //Disable all console.log() in Production
    // eslint-disable-next-line angular/window-service
    window.console.log = function () { };
  }
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
