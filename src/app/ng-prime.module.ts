
import { NgModule } from '@angular/core';

import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast'
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  exports: [
    GalleriaModule,
    ImageModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    SkeletonModule,
    SidebarModule,
    ToastModule,
    TooltipModule
  ]
})

export class NgPrimeAntdModule {}

