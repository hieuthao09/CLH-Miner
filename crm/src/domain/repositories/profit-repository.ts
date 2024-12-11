import { Injectable } from '@angular/core';
import { RequestParams } from 'core/params/requestParams';
import { ListProfitResponse } from 'data/responses/profit/profit-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IProfitRepository {
	abstract getProfit(params: { pMinUtil: number }): Observable<ListProfitResponse>;
}
