
import { NgModule } from '@angular/core';

import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@NgModule({
  exports: [
    GalleriaModule,
    ImageModule
  ]
})

export class NgPrimeAntdModule {}

