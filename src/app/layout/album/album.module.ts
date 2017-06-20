import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AlbumRoutingModule, AlbumModuleRoutedComponents, AlbumlModuleRoutedProviders } from './album-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule
  ],
  declarations: [AlbumModuleRoutedComponents],
  providers: [AlbumlModuleRoutedProviders]
})
export class AlbumModule { }
