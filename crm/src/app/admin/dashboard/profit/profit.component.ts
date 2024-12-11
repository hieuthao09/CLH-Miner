import { Component, OnInit } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsProfit } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { IProfit } from 'data/requests/profit/profit-request';
import { ProfitService } from 'domain/services/profit/profit-service';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { testData } from '../../../../../test';

@Component({
	selector: 'app-profit',
	templateUrl: './profit.component.html',
	styles: ``,
})
export class ProfitComponent implements OnInit {
	// products: IProfit[] = testData;
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;

	profitQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.profit.list(),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.profitService.getProfit({ pMinUtil: 1 }).pipe(takeUntil(abort$)));
		},
	}));

	constructor(breadcrumbService: BreadcrumbService, private profitService: ProfitService) {
		this.breadcrumbService = breadcrumbService;
	}

	ngOnInit() {
		this.breadcrumbs = breadcrumbsProfit;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}
}
