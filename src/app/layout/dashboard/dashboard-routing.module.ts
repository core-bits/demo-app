import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashBoardComponent } from './dashboard.component';


export const routes: Routes = [
    { path: '', component: DashBoardComponent, data: { appTitle: '[Application Title Goes Here]' } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashBoardRoutingModule { }

export const DashboardRoutedComponents = [DashBoardComponent];