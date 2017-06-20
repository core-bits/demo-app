import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JQUERY_TOKEN } from './jquery.service';
import { TOASTR_TOKEN, IToastr } from './toastr.service';
import { ParamUtil } from './iparam';


import { throwIfAlreadyLoaded } from './module-import-guard';


// imports:: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
// exports:: exports modules AND components/directives/pipes that other modules may want to use

declare let toastr: IToastr;
declare let jQuery: any;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    { provide: JQUERY_TOKEN, useValue: jQuery },
    { provide: TOASTR_TOKEN, useValue: toastr }
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
