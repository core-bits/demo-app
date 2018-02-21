import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalNavbarComponent } from './components/horizontal-navbar/horizontal-navbar.component';
import { LayoutFooterComponent } from "app/layouts-section/components/layout-footer/layout-footer.component";
import { RouterModule } from "@angular/router";

const LayoutsSectionModuleComponents = [
  LayoutFooterComponent, HorizontalNavbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [RouterModule, LayoutsSectionModuleComponents],
  declarations: [LayoutsSectionModuleComponents]
})
export class LayoutsSectionModule { }
