import { NgModule } from '@angular/core';

import { DashBoardRoutingModule, DashboardRoutedComponents } from './dashboard-routing.module';

@NgModule({
    imports: [DashBoardRoutingModule],
    declarations: [DashboardRoutedComponents]
})
export class DashBoardModule { }