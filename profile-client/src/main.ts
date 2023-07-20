import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements as ERSStencilDefineCustomElements } from 'ers-stencil/dist/loader';
import { defineCustomElements } from 'kds-stencil/dist/loader';
// import { UserProfileUiLibModule } from './app/lib/user-profile-ui-lib.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

defineCustomElements(window);
ERSStencilDefineCustomElements(window);
