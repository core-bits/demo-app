import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageTitleComponent } from './page-title.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PageTitleComponent],
  declarations: [PageTitleComponent]
})
export class PageTitleModule { }
