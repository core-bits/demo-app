import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { XtelthRoutingModule, XtelthModuleComponents } from './xtelth-routing.module';
import { LayoutsModule } from "app/layouts/layouts.module";
import { TaskService } from "app/xtelth/task/task.service";
import { CoreModule } from "app/core/core.module";
import { SharedModule } from "app/shared/shared.module";
import { AssetService } from "app/xtelth/asset/asset.service";
import { XpyExecutionService } from "app/xtelth/xpy/xpy.service";
import { MapToIterablePipe } from "app/xtelth/shared/pipes/key-value-pair";
import { XTelthSharedModule } from "app/xtelth/shared/xtelth-shared.module";
import { NewTaskComponent } from "app/xtelth/task/new-task/new-task.component";
import { TaskScriptComponent } from "app/xtelth/task/new-task/task-script.component";
import { InputParameterComponent } from "app/xtelth/task/new-task/input-parameter.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    SharedModule,
    XTelthSharedModule,
    XtelthRoutingModule
  ],
  declarations: [
    XtelthModuleComponents, MapToIterablePipe,
    NewTaskComponent, TaskScriptComponent, InputParameterComponent],
  providers: [TaskService, AssetService, XpyExecutionService]
})
export class XtelthModule { }
