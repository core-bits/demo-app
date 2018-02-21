import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetComponent } from "app/xtelth/asset/asset/asset.component";
import { XpyComponent } from "app/xtelth/xpy/xpy/xpy.component";
import { DefaultComponent } from "app/layouts/default/default.component";
import { DashboardComponent } from "app/xtelth/dashboard/dashboard/dashboard.component";
import { TaskListComponent } from "app/xtelth/task/task-list/task-list.component";
import { TaskGroupComponent } from "app/xtelth/task/task-list/task-group.component";
import { ChildDashboardComponent } from 'app/xtelth/dashboard/child-dashboard/child-dashboard.component';

const routes: Routes = [
  {
    path: 'default',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assets',
        component: AssetComponent
      },
      {
        path: 'tasks',
        component: TaskListComponent
      },
      {
        path: 'task-group',
        component: TaskGroupComponent
      },
      {
        path: 'xpy',
        component: XpyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XtelthRoutingModule { }

export const XtelthModuleComponents = [
  AssetComponent, TaskListComponent,
  XpyComponent, DashboardComponent, 
  TaskGroupComponent, ChildDashboardComponent
];
