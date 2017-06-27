import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PanelComponent } from './panel/panel.component';
import { CustomModalComponent } from './custom-modal.component';
import { CustomModalTriggerDirective } from './custom-modal-trigger.directive';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchTextComponent, SearchFieldUtils, SearchFieldConfig } from './components/search-input/search-input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PageSizeComponent, PageSizeConfig } from './components/page-size/page-size.component';
import { SortDirective } from './components/sort/sort.directive';
import { SortComponent, SortConfig } from './components/sort/sort.component';
import { PageOfComponent } from './components/page-of/page-of.component';

import { PageTitleModule } from './modules/page-title/page-title.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    FooterComponent,
    NavComponent,
    PanelComponent,
    CustomModalComponent,
    CustomModalTriggerDirective,
    PageTitleModule,
    SearchTextComponent,
    PaginationComponent,
    PageSizeComponent,
    SortDirective,
    SortComponent,
    PageOfComponent
  ],
  declarations: [
    FooterComponent,
    NavComponent,
    PanelComponent,
    CustomModalComponent,
    CustomModalTriggerDirective,
    SearchTextComponent,
    PaginationComponent,
    PageSizeComponent,
    SortDirective,
    SortComponent,
    PageOfComponent
  ],
  providers: [
    SearchFieldUtils,
    SortConfig,
    PageSizeConfig,
    SearchFieldConfig]
})
export class SharedModule { }
