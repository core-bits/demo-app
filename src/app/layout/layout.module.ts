import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule, LayoutModuleRoutedComponents } from './layout-routing.module';

//Imports of application Custom/Feature Modules
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule
    ],
    declarations: [
        LayoutModuleRoutedComponents
    ]
})
export class LayoutModule implements OnInit {

    constructor() { }

    ngOnInit() { }
}