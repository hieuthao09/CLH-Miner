import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../_modules/admin-shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfitComponent } from './profit/profit.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
	declarations: [DashboardComponent, ProfitComponent],
	imports: [CommonModule, DashboardRoutingModule, AdminSharedModule],
})
export class DashboardModule {}
