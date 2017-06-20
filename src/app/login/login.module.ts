import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule, LoginModuleRoutedComponents } from './login-routing.module';
import { LoginService } from './login.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginModuleRoutedComponents
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
