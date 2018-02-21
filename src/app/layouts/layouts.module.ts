import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { LayoutsSectionModule } from "app/layouts-section/layouts-section.module";

const LayoutsModuleComponents = [
  DefaultComponent
];

@NgModule({
  imports: [
    CommonModule,
    LayoutsSectionModule
  ],
  exports: [LayoutsModuleComponents],
  declarations: [LayoutsModuleComponents]
})
export class LayoutsModule { }
