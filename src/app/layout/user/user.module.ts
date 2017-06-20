import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { UserRoutingModule, UserModuleRoutedComponents, UserModuleRoutedProviders } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserModuleRoutedComponents
  ],
  providers: [
    UserModuleRoutedProviders
  ]
})
export class UserModule { }
