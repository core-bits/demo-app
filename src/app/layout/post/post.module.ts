import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { PostRoutingModule, PostModuleRoutedComponents, PostModuleRoutedProviders } from './post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ],
  declarations: [
    PostModuleRoutedComponents
  ],
  providers: [
    PostModuleRoutedProviders
  ]
})
export class PostModule { }
