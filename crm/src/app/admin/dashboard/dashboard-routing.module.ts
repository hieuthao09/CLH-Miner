import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitComponent } from './profit/profit.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'profit',
	},
	{
		path: 'profit',
		component: ProfitComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
